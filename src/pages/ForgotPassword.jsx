// Importing dependencies
import { useState } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput";

// Importing the style
import '../styles/password.css'

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
            <div className="password">
                <div className="title">
                    <h1>Presque terminé !</h1>
                    <h1>Plus qu'une étape !</h1>
                </div>

                <img src={illustration}></img>

                <h1>Création du mot de passe</h1>

                <form onSubmit={handleSubmit}>
                    <FormInput inputText={'Mot de passe'} name={'password'} value={formData.password} onChange={handleChange}></FormInput>
                    <FormInput inputText={'Confirmation du mot de passe'} name={'passwordConfirm'} value={formData.passwordConfirm} onChange={handleChange}></FormInput>
                    <p>Votre mot de passe doit faire 8 caractères minimum</p>
                    <button type="submit">Confirmer le compte</button>
                </form>
            </div>
        </>
    )
}

export default Login