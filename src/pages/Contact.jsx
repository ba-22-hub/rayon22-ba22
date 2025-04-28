// Importing dependencies
import { useState } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput"
import FormTextArea from "../common/FormTextArea"

/**
 * The Contact page.
 * @returns {React.ReactElement} Contact component.
 */
function Contact() {
    // useState init to store the form data in a JSON format
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
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
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        });

        // sending the customer an alert to notify the form has successfully been submited
        alert('Votre message a bien été envoyé ! Merci.');
    }
    return (
        <>
            <h1>Contactez-nous</h1>
            <h2>Un contact si besoin</h2>
            <p>
                Quelque soit le sujet (une réclamation, un problème de livraison ou de délais, un contenu défectueux...) ou un sujet concernant ma situation personnelle, j’adresse un message (pour un problème de commande préciser la date de commande).

                Je serai recontacté au numéro de téléphone ou l’adresse mail donné lors de mon inscription.
            </p>

            <div>
                <h2>Formulaire de contact</h2>

                {/* Contact form */}
                <form onSubmit={handleSubmit}>
                    <FormInput inputText="Prénom :" name="firstName" value={formData.firstName} onChange={handleChange} />
                    <FormInput inputText="Nom :" name="lastName" value={formData.lastName} onChange={handleChange} />
                    <FormInput inputText="Adresse e-mail :" name="email" value={formData.email} onChange={handleChange} />
                    <FormInput inputText="Téléphone :" name="phone" value={formData.phone} onChange={handleChange} />
                    <FormTextArea textAreaName="Message :" name="message" value={formData.message} onChange={handleChange} />
                    <button type="submit">Envoyer</button>
                </form>

            </div>
        </>
    )
}

export default Contact