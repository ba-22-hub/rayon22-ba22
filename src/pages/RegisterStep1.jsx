// Importing dependencies
import { useState, useRef } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput"
import PageButton from "../common/PageButton"
import FunctionButton from '../common/FunctionButton';

// Importing the style
import '../styles/register.css'
import { fileURLToPath } from 'url';

/**
 * The Register page for the first step.
 * @returns {React.ReactElement} RegisterStep1 component.
 */
function RegisterStep1() {
    const [formData, setFormData] = useState ({
        gender : '', 
        finstName : '',
        lastName : '',
        birthday : '',
        phone : '',
        email : '', 
        file: null
    })

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

    function handleSubmit(e){
        e.preventDefault();
        
        console.log("Form submitted with data:", formData);

        // reset the form data after submission
        setFormData({
            gender : '', 
            finstName : '',
            lastName : '',
            birthday : '',
            phone : '',
            email : '', 
            file: null
        });

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

                <FormInput inputText="Prénom " name="firstName" value={formData.firstName} onChange={handleChange} isStarred={true}/>
                <FormInput inputText="Nom" name="lastName" value={formData.lastName} onChange={handleChange} isStarred={true}/>
                
                <label>Date de naissance <red>*</red></label><br />
                <input className="date" type="date" name="birthday" value={formData.birthday} onChange={handleChange} /><br /><br />
                
                <FormInput inputText="Téléphone" name="region" value={formData.telephone} onChange={handleChange} isStarred={true}/>
                <FormInput inputText="Adresse mail " name="street" value={formData.mail} onChange={handleChange} isStarred={true}/>

                <button type="submit" className='register-button'>Suivant</button>
            </form>
        </>
    ) 
}

export default RegisterStep1;