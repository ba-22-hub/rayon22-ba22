// Importing dependencies
import { useState } from 'react';

// Importing common components
import FormInput from "../common/FormInput";

// Importing assets
import illustration from "../assets/logos/password.png"

/**
 * The Login page.
 * @returns {React.ReactElement} Login component.
 */
function Login() {
    // useState init to store the form data in a JSON format
    const [formData, setFormData] = useState({
        password: '',
        passwordConfirm: ''
    });

    // function to set the new formData value whenever the inputs are changed
    function handleChange(e) {
        // we set the formData value to the current input value
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // function to hadle the form submit
    function handleSubmit(e) {
        e.preventDefault();
        // printing the formData content in the console for now
        // TODO : connect with the server
        console.log(formData);

        // resets the inputs and formData to blank
        setFormData({
            password: '',
            passwordConfirm: ''
        });
    }

    return (
    <>
    <div className="bg-[#ffffff] w-[70vw] mx-auto mt-32 mb-10 rounded-2xl shadow-sm flex flex-col items-center justify-start py-16 px-4">
      {/* Titre principal */}
      <div className="text-center">
        <h1 className="text-[#2E2EFF] text-7xl font-extrabold leading-tight">
          Vous avez presque terminé !
          <br />
          Plus qu’une étape !
        </h1>
      </div>

      {/* Illustration */}
      <img src={illustration} alt="Illustration" className="w-64 mt-10 mb-6" />

      {/* Sous-titre */}
      <h2 className="text-[#2E2EFF] text-4xl font-bold mb-6">Création du mot de passe</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <FormInput
          inputText={<span className="text-rayonblue">Mot de passe <span className="text-red-500">*</span></span>}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
        />
        <FormInput
          inputText={<span className="text-rayonblue">Confirmation du mot de passe <span className="text-red-500">*</span></span>}
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
        />

        {/* Bloc règles */}
        <div className="bg-[#F0F0F0] rounded-lg px-6 py-4 text-sm text-[#2E2EFF] font-medium leading-relaxed mt-6">
          <p className="mb-1 font-bold">Règles pour définir le mot de passe</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Doit contenir au moins 8 caractères</li>
            <li>Doit contenir au moins un caractère en majuscule</li>
            <li>Doit contenir au moins un caractère en minuscule</li>
            <li>Doit contenir au moins un nombre</li>
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

export default Login