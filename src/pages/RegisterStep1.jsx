// Importing dependencies
import { useState, useRef, useEffect } from 'react';

// Importing common components
import FormInput from "../common/FormInput"

// Importing the style
import '../styles/register.css'
import { fileURLToPath } from 'url';
import { on } from 'events';

/**
 * The Register page for the first step.
 * @returns {React.ReactElement} RegisterStep1 component.
 */
function RegisterStep1({ data, onDataChange, onNext }) {
    const [formData, setFormData] = useState(data)


    useEffect(() => {
        onDataChange(formData);
    }, [formData]);



    // function to set the new formData value whenever the inputs are changed
    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: checked
            })
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }

    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log("Form submitted with data:", formData);
        onNext();       

    }

    return (
        <>
            <span style={{ display: 'block', marginTop: '6rem' }}></span>
            <p className='center'><red>Les informations avec une étoile rouge sont indispensables pour instruire votre dossier.</red></p>
            <span style={{ display: 'block', marginTop: '2rem' }}></span>
            <p className='center'>
                <black>
                    Essayez de remplir le maximum de rubriques en ligne et préparez vos réponses pour compléter en direct les rubriques lors du rappel de nos équipes.<br />
                    Ajoutez vos dépenses au même titre que vos revenus.
                </black>
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Genre <red>*</red></label><br />
                    <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Homme
                    <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Femme
                    <input type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleChange} /> Autre
                </div><br />

                <FormInput inputText="Prénom" name="firstName" value={formData.firstName} onChange={handleChange} isStarred={true} />
                <FormInput inputText="Nom" name="lastName" value={formData.lastName} onChange={handleChange} isStarred={true} />

                <label>Date de naissance <red>*</red></label><br />
                <input className="date" type="date" name="birthday" value={formData.birthday} onChange={handleChange} /><br /><br />

                <FormInput inputText="Téléphone" name="phone" value={formData.phone} onChange={handleChange} isStarred={true} />
                <FormInput inputText="Adresse mail" name="email" value={formData.email} onChange={handleChange} isStarred={true} />

                <button type="submit" className='register-button'>Suivant</button>
            </form>
        </>
    )
}

export default RegisterStep1;