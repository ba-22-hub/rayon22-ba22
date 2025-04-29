// Importing dependencies
import { useState } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput";

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
            <h2>Presque terminé !</h2>
            <h2>Plus qu'une étape !</h2>

            <h1>Création du mot de passe</h1>

            <form onSubmit={handleSubmit}>
                <FormInput inputText={'Mot de passe'} name={'password'} value={formData.password} onChange={handleChange}></FormInput>
                <FormInput inputText={'Confirmation du mot de passe'} name={'passwordConfirm'} value={formData.passwordConfirm} onChange={handleChange}></FormInput>
                <button type="submit">Confirmer le compte</button>
            </form>
        </>
    )
}

export default Login