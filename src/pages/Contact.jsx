// Importing dependencies
import { useState, useRef } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput"
import FormTextArea from "../common/FormTextArea"

// Importing assets
import roundLogo from "../assets/logos/roundLogo.png"

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
            {/* Header section with blue background */}
            <div className="bg-gradient-to-b from-[#3435FF] via-[#2526B7] to-[#1F2099] h-52 text-white">
                <h1 className="pt-14 ml-[460px] text-xl font-bold">Contactez-nous</h1>
            </div>

            <div className="flex">
                {/* Contact text section */}
                <div className="ml-44 mr-28">
                    <h2 className="mt-48 text-lg font-semibold mb-4">Un contact si besoin</h2>
                    <p className="w-96 text-sm leading-relaxed">
                        Quelque soit le sujet (une réclamation, un problème de livraison ou de délais, un contenu défectueux...) ou un sujet concernant ma situation personnelle, j'adresse un message (pour un problème de commande préciser la date de commande).
                        <span className="block mt-4"></span>
                        Je serai recontacté au numéro de téléphone ou l'adresse mail donné lors de mon inscription.
                    </p>
                    <img src={roundLogo} className="w-52 h-52 ml-14 mt-8 transform -rotate-[13.55deg]" alt="Logo" />
                </div>

                {/* Contact form section */}
                <div className="mt-16 pt-2 px-11 bg-white mb-16">
                    <h2 className="text-lg font-semibold mb-4">Formulaire de contact</h2>

                    {/* Contact form */}
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-12">
                            <div className="flex-1">
                                <FormInput inputText="Prénom :" name="firstName" value={formData.firstName} onChange={handleChange} />
                            </div>
                            <div className="flex-1">
                                <FormInput inputText="Nom :" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <FormInput inputText="Adresse e-mail :" name="email" value={formData.email} onChange={handleChange} />
                        <FormInput inputText="Téléphone :" name="phone" value={formData.phone} onChange={handleChange} />
                        <FormTextArea textAreaName="Message :" name="message" value={formData.message} onChange={handleChange} />
                        <label className="block text-sm font-medium mb-2">Document requis :</label>
                        <input 
                            type='file' 
                            accept='.pdf' 
                            name='file' 
                            onChange={handleFileChange} 
                            ref={fileInputRef} 
                            className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rayonblue file:text-white hover:file:bg-blue-600"
                        />
                        <button 
                            type="submit" 
                            className="w-[500px] h-11 ml-9 mb-8 bg-rayonblue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                        >
                            Envoyer
                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Contact