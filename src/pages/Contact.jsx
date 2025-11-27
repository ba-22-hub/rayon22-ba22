// Importing dependencies
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { uploadPDF } from '@lib/sendPDF.js';
import { useAuthor } from '@context/AuthorContext.jsx';
import { useNavigate } from 'react-router-dom';
import { displayNotification } from '@lib/displayNotification.jsx';

// Importing common components
import FormTextArea from "@common/FormTextArea"
import Loading from '@common/Loading';

// Importing assets
import roundLogo from "@assets/logos/roundLogo.png"

/**
 * The Contact page.
 * @returns {React.ReactElement} Contact component.
 */
function Contact() {

	let navigate = useNavigate()
	const { user, loading } = useAuthor()

	const [formData, setFormData] = useState({
		message: '',
		file: null
	});

	// State to manage form submission
	const [submitting, setSubmitting] = useState(false);

	const isNotified = useRef(false)

	useEffect(() => {
		if (loading) return;
		if (!user) {
			notify("Vous devez vous connecter pour utiliser cette fonctionnalité !")
			navigate('/login')
			return;
		}
	}, [loading])

	function notify(message) {
		if (isNotified.current) return;
		isNotified.current = true
		alert(message)
	}

	const fileInputRef = useRef(null);

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	}

	function handleFileChange(e) {
		const file = e.target.files[0];
		setFormData({
			...formData,
			file: file
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitting(true); // Start loader

		const name = formData.file ? `${Date.now()}_${formData.file.name}` : null;
		let uploadSuccess = true;

		// uppload the PDF file if it exists
		if (formData.file) {
			const { success, error } = await uploadPDF(formData.file, name, "messages")
			if (!success) {
				displayNotification("Échec de l'upload du fichier PDF", error.message, "danger")
				uploadSuccess = false;
			}
		}

		if (!uploadSuccess) {
			setSubmitting(false); // stop loader
			return;
		}

		// Message insertion in the db
		const newMessage = {
			user_id: user.id,
			message: formData.message,
			pdf_name: name,
		};

		const { error: insertError } = await supabase
			.from('Messages')
			.insert([newMessage]);

		if (insertError) {
			displayNotification("Erreur lors de l'envoi du message", insertError.message, "danger")
			setSubmitting(false); // stop loader
			return;
		}

		displayNotification("Message envoyé avec succès", "", "success")

		// Reset du formulaire
		setFormData({ message: '', file: null });
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}

		alert('Votre message a bien été envoyé ! Merci.');

		setSubmitting(false); // stop loader
	}

	return (
		<>
			{(!user || submitting) ? (
				<Loading text={submitting ? "Envoi de votre message..." : "Chargement en cours..."} />
			) : (
				<>
					<div className="bg-gradient-to-b from-[#3435FF] via-[#2526B7] to-[#1F2099] h-52 text-white flex items-center justify-center">
						<h1 className="text-5xl font-bold">Contactez-nous</h1>
					</div>

					<div className="lg:flex justify-center bg-[#FFF8F4] pb-20">
						{/* Left Text Section */}
						<div className="pl-5 lg:w-[35%] mt-10 lg:mt-24 pr-5 lg:pr-16">
							<h2 className="text-[#2E2EFF] text-3xl font-bold mb-6">Un contact si besoin</h2>
							<p className="text-[#2E2EFF] text-xl leading-relaxed">
								Quelque soit le sujet (une réclamation, un problème de livraison ou de délais, un contenu défectueux...)
								ou un sujet concernant ma situation personnelle, j’adresse un message (pour un problème de commande
								préciser la date de commande).
								<br /><br />
								Je serai recontacté au numéro de téléphone ou l’adresse mail donné lors de mon inscription.
							</p>
							<img src={roundLogo} alt="Logo" className="hidden lg:flex w-80 mt-16 ml-12 -rotate-[13.55deg]" />
						</div>

						{/* Right Form Section */}
						<div className="bg-white shadow-md rounded-xl px-10 py-8 lg:w-[45%] h-[45%] mt-5 lg:mt-16 mx-3 lg:mx-0">
							<h2 className="text-[#2E2EFF] text-2xl font-bold mb-6">Formulaire de contact</h2>

							<form onSubmit={handleSubmit}>
								<FormTextArea
									textAreaName={"Message"}
									name="message"
									value={formData.message}
									onChange={handleChange}
									isStarred={true}
									className="h-64 border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
								/>

								<label className="block text-sm font-medium text-[#2E2EFF] mb-2">Document requis :</label>
								<input
									type='file'
									accept='.pdf'
									name='file'
									onChange={(e) => {
										if (e.target.files[0]) {
											displayNotification("Fichier sélectionné :", e.target.files[0].name, "info")
											handleFileChange(e);
										}
									}}
									ref={fileInputRef}
									className="mb-6 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2E2EFF] file:text-white hover:file:bg-blue-700"
								/>

								<div className="flex justify-center">
									<button
										type="submit"
										disabled={submitting}
										className="bg-[#FF7A00] text-white font-light tracking-wider w-full py-3 rounded-lg text-sm hover:bg-orange-600 transition disabled:opacity-50"
									>
										{submitting ? "Envoi en cours..." : "Envoyer"}
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
