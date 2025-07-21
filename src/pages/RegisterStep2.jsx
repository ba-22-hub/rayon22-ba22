// Importing dependencies
import { useState, useRef, useEffect } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput"
import PageButton from "../common/PageButton"
import FunctionButton from '../common/FunctionButton';

// Importing the style

/**
 * The Register page for the first step.
 * @returns {React.ReactElement} RegisterStep1 component.
 */
function RegisterStep2({data, onDataChange, onNext, onPrevious}) {
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
            });
        } else if (name === "wageType") {
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

    function handleSubmit(e) {
        e.preventDefault();

        console.log("Form submitted with data:", formData);

        onNext();

    }
    // function for the other wage text input
    function handleOtherWageChange(e) {
        setFormData(prevData => ({
            ...prevData,
            otherWage: e.target.value
        }));
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <FormInput inputText="Rue :" name="address" value={formData.street} onChange={handleChange} />
                <FormInput inputText="Complément d'adresse :" name="addAddress" value={formData.addr} onChange={handleChange} />
                <FormInput inputText="Votre commune :" name="city" value={formData.region} onChange={handleChange} isStarred={true} />
                <FormInput inputText="Code postal :" name="postalCode" value={formData.postalCode} onChange={handleChange} isStarred={true} />

                <div className="situation">
                    <label>Situation <red>*</red></label><br />
                    <input type="radio" name="situation" value="employee" checked={formData.situation === "employee"} onChange={handleChange} /> Salarié
                    <input type="radio" name="situation" value="jobless" checked={formData.situation === "jobless"} onChange={handleChange} /> Sans emploi
                    <input type="radio" name="situation" value="student" checked={formData.situation === "student"} onChange={handleChange} /> Étudiant
                    <input type="radio" name="situation" value="retired" checked={formData.situation === "retired"} onChange={handleChange} /> Retraité
                </div><br />

                <FormInput inputText="Quotient familial (attestation CAF) :" name="quotient" value={formData.quotient} onChange={handleChange} isStarred={true} />

                <div className="revenus">
                    <label>Vos revenus <red>*</red></label><br />
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



                <div className="legal">
                    <p>L’inscription nécessitera un contact avec nos équipes. Dans certains cas, un rendez-vous avec une assistante sociale de proximité sera nécessaire. Dans tous les cas, une validation des conditions de ressources sera réalisée. Au plus vite inscrit, au plus vite livré.</p>
                    <input
                        type="checkbox"
                        name="readInfo"
                        checked={formData.readInfo}
                        onChange={handleChange}
                        required
                    />
                    <label>J’ai lu et compris ces informations.</label><br />

                    <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        required
                    />
                    <label>J’accepte les conditions d’utilisation.    </label>
                    <span href="" className='link-CU'>Lire les conditions d'utilisation</span>
                </div><br />

                <button type="submit" className='register-button'>Valider</button> <br />
                <button onClick={onPrevious} className='previous-button'>⮪ Précédent</button>
            </form>
        </>
    )
}

export default RegisterStep2;