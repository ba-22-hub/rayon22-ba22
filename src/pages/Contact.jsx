// Importing dependencies
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { uploadPDF } from '@lib/sendPDF.js';
import { useAuthor } from '../context/AuthorContext';
import { useNavigate } from 'react-router-dom';


// Importing common components
import FormTextArea from "../common/FormTextArea"
import Loading from '../common/Loading';
// Importing assets
import roundLogo from "../assets/logos/roundLogo.png"

/**
 * The Contact page.
 * @returns {React.ReactElement} Contact component.
 */
function Contact() {

	// DEBUG : Listing PDF files and getting a signed URL for a specific file
	let navigate = useNavigate()
	const { user, loading } = useAuthor()
	// useState init to store the form data in a JSON format
	const [formData, setFormData] = useState({
		message: '',
		file: null
	});

	const isNotified = useRef(false)

	useEffect(() => {
		if (loading) return; // the page needs all the informations to start
		if (!user) {
			notify("Vous devez vous connecter pour utiliser cette fonctionnalité !")
			navigate('/login')
		}
	}, [loading]) // useEffect trigger again when all is loaded

	// function to avoid double notification in the login routine
    function notify(message) {
        console.log(message, isNotified)
        if (isNotified.current) return;  // no need to notify again
        isNotified.current = true
        alert(message)
    }

	// ref to the file field content
	const fileInputRef = useRef(null);

	// function to set the new formData value whenever the inputs are changed
	function handleChange(e) {
		// we set the formData value to the current input value
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	}

	// function to set the new file formData field value whenever the input changes
	function handleFileChange(e) {
		const file = e.target.files[0];
		setFormData({
			...formData,
			file: file
		});
	}

	// function to handle the form submit
	async function handleSubmit(e) {
		e.preventDefault();

		const name = formData.file ? `${Date.now()}_${formData.file.name}` : null;

		let uploadSuccess = true;

		// First step : Upload the PDF file if it exists
		if (formData.file) {
			const { success, error } = await uploadPDF(formData.file, name, "messages")

			if (!success) {
				console.error("❌ Upload échoué :", error);
				alert("Erreur lors de l'upload du fichier PDF.");
				uploadSuccess = false;
			}
		}

		if (!uploadSuccess) return;

		// Second step : Insert the message into the database
		const newMessage = {
			user_id: user.id,
			message: formData.message,
			pdf_name: name,
		};

		const { error: insertError } = await supabase
			.from('Messages')
			.insert([newMessage]);

		if (insertError) {
			console.error("❌ Erreur lors de l'insertion :", insertError.message);
			alert("Erreur lors de l'envoi du message.");
			return;
		}

		console.log("✅ Message inséré avec succès !", newMessage);

		// Third step: Reset the form

		// resets the inputs and formData to blank
		setFormData({
			message: '',
			file: null
		});

		// manually emptying the file field
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}

		// sending the customer an alert to notify the form has successfully been submited
		alert('Votre message a bien été envoyé ! Merci.');
	}
	return (
		<>
			{!user ? (
				<Loading />
			) : (
				<>
					<div className="bg-gradient-to-b from-[#3435FF] via-[#2526B7] to-[#1F2099] h-52 text-white flex items-center justify-center">
						<h1 className="text-5xl font-bold">Contactez-nous</h1>
					</div>

					<div className="flex justify-center bg-[#FFF8F4] pb-20">
						{/* Left Text Section */}
						<div className="w-[35%] mt-24 pr-16">
							<h2 className="text-[#2E2EFF] text-3xl font-bold mb-6">Un contact si besoin</h2>
							<p className="text-[#2E2EFF] text-xl leading-relaxed">
								Quelque soit le sujet (une réclamation, un problème de livraison ou de délais, un contenu défectueux...)
								ou un sujet concernant ma situation personnelle, j’adresse un message (pour un problème de commande
								préciser la date de commande).
								<br /><br />
								Je serai recontacté au numéro de téléphone ou l’adresse mail donné lors de mon inscription.
							</p>
							<img src={roundLogo} alt="Logo" className="w-80 mt-16 ml-12 -rotate-[13.55deg]" />
						</div>

						{/* Right Form Section */}
						<div className="bg-white shadow-md rounded-xl px-10 py-8 w-[45%] h-[45%] mt-16">
							<h2 className="text-[#2E2EFF] text-2xl font-bold mb-6">Formulaire de contact</h2>

							<form onSubmit={handleSubmit}>

								{/* Message */}
								<FormTextArea
									textAreaName={"Message"}
									name="message"
									value={formData.message}
									onChange={handleChange}
									isStarred={true}
									className="h-64 border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
								/>

								{/* File Upload */}
								<label className="block text-sm font-medium text-[#2E2EFF] mb-2">Document requis :</label>
								<input
									type='file'
									accept='.pdf'
									name='file'
									onChange={(e) => { console.log("Fichier sélectionné :", e.target.files[0]); handleFileChange(e); }}
									ref={fileInputRef}
									className="mb-6 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2E2EFF] file:text-white hover:file:bg-blue-700"
								/>

								<div className="flex justify-center">
									<button
										type="submit"
										className="bg-[#FF7A00] text-white font-light tracking-wider w-full py-3 rounded-lg text-sm hover:bg-orange-600 transition"
									>
										Envoyer
									</button>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default Contact