// Importing dependencies
import { useState } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput";
import PageButton from "../common/PageButton";
import Account from './Account';

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
            mail: '',
            password: ''
        });
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
            inputText={<span className="text-rayonblue">Adresse email <span className="text-red-500">*</span></span>}
            name={'mail'}
            value={formData.mail}
            onChange={handleChange}
            className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full"
          />
        </div>
        <div className="w-[65%] mx-auto">
          <FormInput
            inputText={<span className="text-rayonblue">Mot de passe <span className="text-red-500">*</span></span>}
            name={'password'}
            value={formData.password}
            onChange={handleChange}
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