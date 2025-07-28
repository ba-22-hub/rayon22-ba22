// Importing dependencies
import { useState } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput";

// Importing assets
import illustration from "../assets/logos/password.png"

/**
 * The Login page.
 * @returns {React.ReactElement} Login component.
 */
function RegisterStep3({ onNext, onDataChange }) {
	// useState init to store the form data in a JSON format
	const [formData, setFormData] = useState({
		password: '',
		passwordConfirm: ''
	});

	const [criteriaPassword, setCriteriaPassword] = useState({
		'minLength' : false, 
		'hasUppercase' : false, 
		'hasLowercase' : false, 
		'hasNumber' : false
	})

	// function to set the new formData value whenever the inputs are changed
	function handleChange(e) {
		const pass = e.target.value
		const field = e.target.name
		// we set the formData value to the current input value
		setFormData({
			...formData,
			[field]: pass
		});


		if(field == "password"){	
			onDataChange({ "password": pass })
			// check if the password respect some instructions
			setCriteriaPassword({
				"minLength" :  pass.length >= 8, 
				"hasLowercase" : /[a-z]/.test(pass), 
				"hasUppercase" : /[A-Z]/.test(pass), 
				"hasNumber" : /[0-9]/.test(pass)
				
			})
		}
	}

	// function to hadle the form submit
	function handleSubmit(e) {
		e.preventDefault();
		// printing the formData content in the console for now
		console.log(formData);

		// checking if the 2 password are identical 
		if (formData.password != formData.passwordConfirm){
			alert("Les mots de passe renseignés sont différents")
		// checking if the password respect the instructions
		} else if (criteriaPassword.minLength && criteriaPassword.hasLowercase && criteriaPassword.hasUppercase && criteriaPassword.hasNumber){
			onNext({ "password": formData.password })
		// if not, alert the client
		} else {
			alert("Le mot de passe ne respecte pas les consignes")
		}
	}

	return (
		<>
			<div className="bg-[#ffffff] mx-auto mt-2 mb-10 flex flex-col items-center justify-start py-10 px-4">
				{/* Illustration */}
				<img src={illustration} alt="Illustration" className="w-64 mt-3 mb-6" />

				{/* Sous-titre */}
				<h2 className="text-[#2E2EFF] text-4xl font-bold mb-6">Création du mot de passe</h2>

				{/* Formulaire */}
				<form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
					<FormInput
						inputText={<span>Mot de passe</span>}
						type="password"
						name="password"
						onChange={handleChange}
						className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
						isStarred={true}
					/>
					<FormInput
						inputText={<span>Confirmation du mot de passe</span>}
						type="password"
						name="passwordConfirm"
						onChange={handleChange}
						className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
						isStarred={true}
					/>

					{/* Bloc règles */}
					<div className="bg-[#F0F0F0] rounded-lg px-6 py-4 text-sm text-[#2E2EFF] font-medium leading-relaxed mt-6">
						<p className="mb-1 font-bold">Règles pour définir le mot de passe</p>
						<ul className="list-disc list-inside space-y-1">
							<li className={criteriaPassword.minLength ? 'text-green' : 'text-red'}>Doit contenir au moins 8 caractères</li>
							<li className={criteriaPassword.hasUppercase ? 'text-green' : 'text-red'}>Doit contenir au moins un caractère en majuscule</li>
							<li className={criteriaPassword.hasLowercase ? 'text-green' : 'text-red'}>Doit contenir au moins un caractère en minuscule</li>
							<li className={criteriaPassword.hasNumber ? 'text-green' : 'text-red'}>Doit contenir au moins un nombre</li>
						</ul>
					</div>

					{/* Bouton */}
					<button
						type="submit"
						className="w-full bg-[#FF8200] text-white py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition"
					>
						Créer mon mot de passe
					</button>
				</form>
			</div>
		</>
	)

}

export default RegisterStep3