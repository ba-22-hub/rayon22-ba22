// Importing dependencies
import { useState } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput"
import PageButton from "../common/PageButton"

/**
 * The Register page.
 * @returns {React.ReactElement} Register component.
 */
function Register() {
    // useState init to store the form data in a JSON format
    const [formData, setFormData] = useState({
        sex: '',
        firstName: '',
        lastName: '',
        birthday: '',
        phone: '',
        email: '',
        region: '',
        street: '',
        addr: '',
        postalCode: '',
        situation: '',
        quotient: '',
        wage: ''
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
            sex: '',
            firstName: '',
            lastName: '',
            birthday: '',
            phone: '',
            email: '',
            region: '',
            street: '',
            addr: '',
            postalCode: '',
            situation: '',
            quotient: '',
            wage: ''
        });

        // sending the customer an alert to notify the form has successfully been submited
        alert('Votre compte a bien été créé ! Merci.');
    }
    return (
        <>
            <h1>Création d’un compte</h1>
            <p>Les informations avec une étoile rouge sont indispensables pour instruire votre dossier.</p>
            <p>
                Essayer de remplir le maximum de rubriques en ligne et préparer vos réponses pour compléter en direct les rubriques lors du rappel de nos équipes.
                Ajouter vos dépenses au même titre que vos revenus.
            </p>

            {/* Register form */}
            <form onSubmit={handleSubmit}>
                {/* TODO : add sex input */}
                {/* Homme | Femme */}
                <FormInput inputText="Prénom :" name="firstName" value={formData.firstName} onChange={handleChange} />
                <FormInput inputText="Nom :" name="lastName" value={formData.lastName} onChange={handleChange} />
                {/* TODO : add birthday input */}
                {/* Date de naissance : dd/mm/yy */}
                <FormInput inputText="Téléphone :" name="phone" value={formData.phone} onChange={handleChange} />
                <FormInput inputText="Adresse e-mail :" name="email" value={formData.email} onChange={handleChange} />
                <FormInput inputText="Votre commune :" name="region" value={formData.region} onChange={handleChange} />
                <FormInput inputText="Rue :" name="street" value={formData.street} onChange={handleChange} />
                <FormInput inputText="Complément d'adresse :" name="addr" value={formData.addr} onChange={handleChange} />
                <FormInput inputText="Code postal :" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                {/* TODO : add situation input */}
                {/* Votre situation : Salarié | Sans emploi | Étudiant | Retraité */}
                <FormInput inputText="Quotient familial (attestation CAF) :" name="quotient" value={formData.quotient} onChange={handleChange} />
                {/* TODO : add wage input */}
                {/* Vos revenus : Salaire ou pension | Bourse étudiante | Aide (RSA, APL) | Autres */}

                <p>L’inscription nécessitera un contact avec nos équipes. Dans certains cas, un rendez-vous avec une assistante sociale de proximité sera nécessaire. Dans tout les cas, une validation des conditions de ressources sera réalisés. Au plus vite inscrit, au plus vite livré.</p>
                {/* TODO : add "J’ai lu et compris ces informations." button */}
                {/* TODO : add "J’ai lu et j’accepte les conditions d’utilisations" button */}

                <button type="submit">Valider</button>
            </form>

            <PageButton buttonText={'Retour à la page d\'accueil'} page={'/'}></PageButton>

        </>
    )
}

export default Register