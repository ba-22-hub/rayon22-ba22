// Importing dependencies
import { useState } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
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
            <div className="bg-white w-[65.56vw] ml-[15.63vw] mt-32 mb-10">
                <h1 className="pt-14 text-center text-2xl font-bold">Bienvenue sur votre Espace Utilisateur</h1>
                <p className="text-black text-lg text-center">Connectez vous en utilisant le formulaire ci-dessous</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="ml-[12.81vw]">
                        <FormInput inputText={'Adresse email'} name={'mail'} value={formData.mail} onChange={handleChange} />
                    </div>
                    <div className="ml-[12.81vw]">
                        <FormInput inputText={'Mot de passe'} name={'password'} value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="ml-[31.06vw]">
                        <PageButton buttonText={'Mot de passe oublié ?'} page={'/forgot-password'} />
                    </div>
                    <button 
                        type="submit" 
                        className="ml-[16.81vw] w-[500px] h-11 mt-14 mb-12 bg-rayonblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        Je me connecte
                    </button>
                </form>

                <p className="text-black text-lg text-center">Vous n'avez pas encore de compte ?</p>
                <div className="text-center">
                    <PageButton buttonText={'Créez votre compte'} page={'/register'} />
                </div>
            </div>
        </>
    )
}

export default Login