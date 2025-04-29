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
            <h1>Bienvenue sur votre Espace Utilisateur</h1>
            <h2>Connectez vous en utilisant le formulaire ci-dessous</h2>

            <form onSubmit={handleSubmit}>
                <FormInput inputText={'Adresse email'} name={'mail'} value={formData.mail} onChange={handleChange}></FormInput>
                <FormInput inputText={'Mot de passe'} name={'password'} value={formData.password} onChange={handleChange}></FormInput>
                <button type="submit">Je me connecte</button>
            </form>
            <PageButton buttonText={'Mot de passe oublié ?'} page={'/forgot-password'}></PageButton>

            <h2>Vous n'avez pas encore de compte ?</h2>
            <PageButton buttonText={'Créez votre compte'} page={'/register'}></PageButton>
        </>
    )
}

export default Login