import { useState } from 'react';

import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput"
import FormTextArea from "../common/FormTextArea"

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        });

        alert('Votre message a bien été envoyé ! Merci.');
    }
    return (
        <>
            <h1>This is the Contact Page</h1>
            <LoremIpsum></LoremIpsum>
            <div>
                <h1>Formulaire de contact</h1>
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