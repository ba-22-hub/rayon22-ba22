// Importing dependencies
import { useState, useRef } from 'react';

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
        message: '',
        file: null
    });

    // ref to the file field content
    const fileInputRef = useRef(null);

    // function to set the new formData value whenever the inputs are changed
    function handleChange(e) {
        // we set the formData value to the current input value
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // function to set the new file formData field value whenever the input changes
    function handleFileChange(e) {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            file: file
        });
    }

    // function to handle the form submit
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
            message: '',
            file: null
        });

        // manually emptying the file field
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

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
                    <label>Document requis :</label><br></br>
                    <input type='file' accept='.pdf' name='file' onChange={handleFileChange} ref={fileInputRef} /><br></br><br></br>
                    <button type="submit">Envoyer</button>
                </form>

            </div>
        </>
    )
}

export default Contact