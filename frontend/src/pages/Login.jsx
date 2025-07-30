// Importing dependencies
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import { useAuthor } from '../context/AuthorContext.jsx';
import { useNavigate } from 'react-router-dom';

// Importing common components
import FormInput from "../common/FormInput";
import PageButton from "../common/PageButton";

/**
 * The Login page.
 * @returns {React.ReactElement} Login component.
 */
function Login() {
	// useState init to store the form data in a JSON format
	const [formData, setFormData] = useState({
		mail: '',
		password: ''
	});
	const { setUser } = useAuthor()
	let navigate = useNavigate()

	// function to set the new formData value whenever the inputs are changed
	function handleChange(e) {
		// we set the formData value to the current input value
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	}

	// function to hadle the form submit
	async function handleSubmit(e) {
		e.preventDefault();
		console.log(formData);

		// Auth Supabase
		const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
			email: formData.mail,
			password: formData.password
		});

		const { data: sessionData } = await supabase.auth.getSession();
		console.log("Session:", sessionData?.session);


		if (loginError) {
			console.error("Erreur login:", loginError.message);
			return;
		}

		const uid = loginData.user.id;

		// Checks if the user already exists in the database
		const { data: existingUser, error: fetchError } = await supabase
			.from('User')
			.select('id')
			.eq('id', uid)
			.single();

		if (fetchError && fetchError.code !== 'PGRST116') {
			// other error
			console.error("Erreur lors de la vérification du user:", fetchError.message);
			return;
		}

		if (!existingUser) {
			const pendingData = localStorage.getItem("pendingUserData");
			if (pendingData) {
				const parsedData = JSON.parse(pendingData);

				const newUser = {
					id: uid,
					email: parsedData.step1.email,
					gender: parsedData.step1.gender,
					firstName: parsedData.step1.firstName,
					lastName: parsedData.step1.lastName,
					birthday: parsedData.step1.birthday,
					phone: parsedData.step1.phone,
					address: parsedData.step2.address,
					addAddress: parsedData.step2.addAddress,
					city: parsedData.step2.city,
					postalCode: parsedData.step2.postalCode,
					situation: parsedData.step2.situation,
					quotient: parsedData.step2.quotient,
					wageType: parsedData.step2.wageType,
					otherWage: parsedData.step2.otherWage,
				};

				const { error: insertError } = await supabase
					.from('User')
					.insert([newUser]);

				if (insertError) {
					console.error("Erreur lors de l'insertion :", insertError.message);
					return;
				}

				localStorage.removeItem("pendingUserData");
				console.log("Utilisateur inséré avec succès !");
			}
		}


		
		console.log("Connexion réussie ! ", existingUser);

		// resets the inputs and formData to blank
		setFormData({
			mail: '',
			password: ''
		});

		// update session
		setUser(loginData.user)
		navigate('/account')
		
	}

	return (
		<>
			<div className="bg-[#ffffff] w-[65.56vw] mx-auto mt-32 mb-10 rounded-2xl shadow-sm py-12 px-6">
				<h1 className="text-[#2E2EFF] text-7xl font-extrabold text-center leading-tight mb-2">
					Bienvenue sur votre Espace Utilisateur
				</h1>
				<p className="text-black text-base text-center mb-10 mt-4">
					Connectez vous en utilisant le formulaire ci-dessous
				</p>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="w-[65%] mx-auto">
						<FormInput
							inputText={<span className="text-rayonblue">Adresse email</span>}
							name={'mail'}
							value={formData.mail}
							onChange={handleChange}
							isStarred={true}
							className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
						/>
					</div>
					<div className="w-[65%] mx-auto">
						<FormInput
							inputText={<span className="text-rayonblue">Mot de passe</span>}
							name={'password'}
							value={formData.password}
							onChange={handleChange}
							isStarred={true}
							type="password"
							className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
						/>
					</div>
					<div className="text-right w-[65%] mx-auto">
						<PageButton
							buttonText={'Mot de passe oublié ?'}
							page={'/forgot-password'}
							className="text-[#2E2EFF] text-sm font-medium underline hover:text-blue-600"
						/>
					</div>
					<div className="w-full flex justify-center">
						<PageButton
							buttonText={'Je me connecte'}
							type="submit"
							className="w-[400px] h-10 bg-[#FF8200] text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition"
						/>
					</div>
				</form>

				<p className="text-[#2E2EFF] text-sm text-center mt-10 mb-4 font-medium">
					Vous n'avez pas encore de compte ?
				</p>
				<div className="flex justify-center">
					<PageButton
						buttonText={'Créez votre compte'}
						page={'/register'}
						className="w-[400px] h-10 bg-[#FF8200] text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition"
					/>
				</div>
			</div>

		</>
	)

}

export default Login