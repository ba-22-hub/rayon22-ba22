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
        gender: '',
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
        wageType: '',
        otherWage: ''
    });

    // function to set the new formData value whenever the inputs are changed
    function handleChange(e) {
        const { name, value } = e.target;
        
        if (name === "wageType") {
            setFormData(prevData => ({
                ...prevData,
                wageType: value,
                otherWage: '' // reset otherWage if another option selected
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    // function for the other wage text input
    function handleOtherWageChange(e) {
        setFormData(prevData => ({
            ...prevData,
            otherWage: e.target.value
        }));
    }

    // function to handle the form submit
    function handleSubmit(e) {
        e.preventDefault();
        
        // preparing wage info before sending
        const finalWage = formData.wageType === 'other' ? formData.otherWage : formData.wageType;
        
        console.log({
            ...formData,
            wage: finalWage
        });

        // resets the inputs and formData to blank
        setFormData({
            gender: '',
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
            wageType: '',
            otherWage: ''
        });

        alert('Votre compte a bien été créé ! Merci.');
    }

    return (
        <>
            <h1>Création d’un compte</h1>
            <p>Les informations avec une étoile rouge sont indispensables pour instruire votre dossier.</p>
            <p>
                Essayez de remplir le maximum de rubriques en ligne et préparez vos réponses pour compléter en direct les rubriques lors du rappel de nos équipes.
                Ajoutez vos dépenses au même titre que vos revenus.
            </p>

            {/* Register form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Genre</label><br />
                    <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Homme
                    <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Femme
                </div><br />
                
                <FormInput inputText="Prénom :" name="firstName" value={formData.firstName} onChange={handleChange} />
                <FormInput inputText="Nom :" name="lastName" value={formData.lastName} onChange={handleChange} />
                
                <label>Date de naissance :</label><br />
                <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} /><br /><br />
                
                <FormInput inputText="Téléphone :" name="phone" value={formData.phone} onChange={handleChange} />
                <FormInput inputText="Adresse e-mail :" name="email" value={formData.email} onChange={handleChange} />
                <FormInput inputText="Votre commune :" name="region" value={formData.region} onChange={handleChange} />
                <FormInput inputText="Rue :" name="street" value={formData.street} onChange={handleChange} />
                <FormInput inputText="Complément d'adresse :" name="addr" value={formData.addr} onChange={handleChange} />
                <FormInput inputText="Code postal :" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                
                <div>
                    <label>Situation</label><br />
                    <input type="radio" name="situation" value="employee" checked={formData.situation === "employee"} onChange={handleChange} /> Salarié
                    <input type="radio" name="situation" value="jobless" checked={formData.situation === "jobless"} onChange={handleChange} /> Sans emploi
                    <input type="radio" name="situation" value="student" checked={formData.situation === "student"} onChange={handleChange} /> Étudiant
                    <input type="radio" name="situation" value="retired" checked={formData.situation === "retired"} onChange={handleChange} /> Retraité
                </div><br />
                
                <FormInput inputText="Quotient familial (attestation CAF) :" name="quotient" value={formData.quotient} onChange={handleChange} />
                
                <div>
                    <label>Vos revenus</label><br />
                    <input type="radio" name="wageType" value="salary" checked={formData.wageType === "salary"} onChange={handleChange} /> Salaire ou pension
                    <input type="radio" name="wageType" value="scholarship" checked={formData.wageType === "scholarship"} onChange={handleChange} /> Bourse étudiante
                    <input type="radio" name="wageType" value="help" checked={formData.wageType === "help"} onChange={handleChange} /> Aide (RSA, APL)
                    <input type="radio" name="wageType" value="other" checked={formData.wageType === "other"} onChange={handleChange} /> Autres
                    {formData.wageType === "other" && (
                        <>
                            <br />
                            <input
                                type="text"
                                name="otherWage"
                                value={formData.otherWage}
                                onChange={handleOtherWageChange}
                                placeholder="Précisez vos revenus"
                            />
                        </>
                    )}
                </div><br />
                
                <p>L’inscription nécessitera un contact avec nos équipes. Dans certains cas, un rendez-vous avec une assistante sociale de proximité sera nécessaire. Dans tous les cas, une validation des conditions de ressources sera réalisée. Au plus vite inscrit, au plus vite livré.</p>

                <button type="submit">Valider</button>
            </form>

            <PageButton buttonText={'Retour à la page d\'accueil'} page={'/'} />
        </>
    );
}

export default Register;
