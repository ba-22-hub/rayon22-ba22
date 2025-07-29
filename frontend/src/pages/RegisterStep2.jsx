// Importing dependencies
import { useState, useEffect } from 'react';

// Importing common components
import FormInput from "../common/FormInput"


// Importing the style

/**
 * The Register page for the first step.
 * @returns {React.ReactElement} RegisterStep1 component.
 */
function RegisterStep2({ data, onDataChange, onNext, onPrevious }) {
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
            <form onSubmit={handleSubmit} className='mlr-[8%] mt-[6rem]'>
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Rue :" name="address" value={formData.street} onChange={handleChange} />
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Complément d'adresse :" name="addAddress" value={formData.addr} onChange={handleChange} />
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Votre commune :" name="city" value={formData.region} onChange={handleChange} isStarred={true} />
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Code postal :" name="postalCode" value={formData.postalCode} onChange={handleChange} isStarred={true} />

                <div>
                    <label className="text-rayonblue ml-[8%]">Situation <a className="text-red">*</a></label><br />
                    <input className="ml-[8%]" type="radio" name="situation" value="Employé" checked={formData.situation === "Employé"} onChange={handleChange} /> <a className="text-rayonblue ml-1">Salarié</a>
                    <input className="ml-8" type="radio" name="situation" value="Sans emploi" checked={formData.situation === "Sans enploi"} onChange={handleChange} /> <a className="text-rayonblue ml-1">Sans emploi</a>
                    <input className="ml-8" type="radio" name="situation" value="Étudiant" checked={formData.situation === "Étudiant"} onChange={handleChange} /> <a className="text-rayonblue ml-1">Étudiant</a>
                    <input className="ml-8" type="radio" name="situation" value="Retraité" checked={formData.situation === "Retraité"} onChange={handleChange} /> <a className="text-rayonblue ml-1">Retraité</a>
                </div><br />

                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Quotient familial (attestation CAF) :" name="quotient" value={formData.quotient} onChange={handleChange} isStarred={true} />

                <div>
                    <label className="text-rayonblue ml-[8%]">Vos revenus <a className="text-red">*</a></label><br />
                    <input className="ml-[8%]" type="radio" name="wageType" value="Salaire" checked={formData.wageType === "Salaire"} onChange={handleChange} /> <a className="text-rayonblue ml-1">Salaire ou pension</a>
                    <input className="ml-8" type="radio" name="wageType" value="Bourse" checked={formData.wageType === "Bourse"} onChange={handleChange} /> <a className="text-rayonblue ml-1">Bourse</a>
                    <input className="ml-8" type="radio" name="wageType" value="Aides" checked={formData.wageType === "Aides"} onChange={handleChange} /> <a className="text-rayonblue ml-1">Aide (RSA, APL)</a>
                    <input className="ml-8" type="radio" name="wageType" value="Autre" checked={formData.wageType === "Autre"} onChange={handleChange} /> <a className="text-rayonblue ml-1">Autres</a>
                    {formData.wageType === "other" && (
                        <>
                            <br />
                            <input
                                className="w-[20%] h-[1.5rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1"
                                type="text"
                                name="otherWage"
                                value={formData.otherWage}
                                onChange={handleOtherWageChange}
                                placeholder="Précisez vos revenus"
                            />
                        </>
                    )}
                </div><br />



                <div className="w-[25rem] bg-gray p-4 rounded-lg ml-[8%]">
                    <p className="text-rayonblue">L’inscription nécessitera un contact avec nos équipes. Dans certains cas, un rendez-vous avec une assistante sociale de proximité sera nécessaire. Dans tous les cas, une validation des conditions de ressources sera réalisée. Au plus vite inscrit, au plus vite livré.</p>
                    <div className="flex items-center mt-2">
                        <input
                            className="w-[1.4rem] h-[1.4rem] rounded-lg border border-rayonblue"
                            type="checkbox"
                            name="readInfo"
                            checked={formData.readInfo}
                            onChange={handleChange}
                            required
                        />
                        <label className="text-rayonblue ml-2">J’ai lu et compris ces informations.</label><br />
                    </div>
                </div><br />

                <div className="ml-[8%] pl-4 flex items-center">
                    <input
                        className="w-[1.4rem] h-[1.4rem] rounded-lg border border-rayonblue"

                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        required
                    />
                    <label className="text-rayonblue ml-2">J’ai lu et j'accepte les conditions d’utilisation.    </label>
                </div>
                    <span href="" className='text-rayonlightblue text-sm ml-[20%]'>Lire les conditions d'utilisation</span> <br />

                <button type="submit" className='text-center-white w-[50%] ml-[25%] mb-3 mt-[5%] h-[2rem] bg-rayonorange'>Valider</button> <br />
                <button onClick={onPrevious} className='text-center text-rayonorange bg-white w-[50%] ml-[25%] mb-[4%] h-[2rem] rounded-lg border border-rayonorange '>⮪ Précédent</button>
            </form>
        </>
    )
}

export default RegisterStep2;