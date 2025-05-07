// Importing dependencies
import { useState } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput";
import PageButton from "../common/PageButton";

// Importing the style
import '../styles/login.css'

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
            <div className="login">
                <h1>Bienvenue sur votre Espace Utilisateur</h1>
                <p>Connectez vous en utilisant le formulaire ci-dessous</p>

                <form onSubmit={handleSubmit}>
                    <FormInput inputText={'Adresse email'} name={'mail'} value={formData.mail} onChange={handleChange}></FormInput>
                    <FormInput inputText={'Mot de passe'} name={'password'} value={formData.password} onChange={handleChange}></FormInput>
                    <PageButton className="forgot" buttonText={'Mot de passe oublié ?'} page={'/forgot-password'}></PageButton>
                    <button type="submit">Je me connecte</button>
                </form>

                <p>Vous n'avez pas encore de compte ?</p>
                <PageButton buttonText={'Créez votre compte'} page={'/register'}></PageButton>
            </div>
        </>
    )
}

export default Login