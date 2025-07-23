// Importing dependencies
import { useState, useEffect } from 'react';

// Importing common components
import FormInput from "../common/FormInput"
import PageButton from '../common/PageButton';



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
            <p className='text-red text-center text-[1.2rem] mlr-[8%] '>Les informations avec une étoile rouge sont indispensables pour instruire votre dossier.</p>
            <span style={{ display: 'block', marginTop: '2rem' }}></span>
            <p className='text-center text-black m-[1rem] text-[1.3rem] mr-[8%]'>
                Essayez de remplir le maximum de rubriques en ligne et préparez vos réponses pour compléter en direct les rubriques lors du rappel de nos équipes.<br />
                Ajoutez vos dépenses au même titre que vos revenus
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="ml-[8%]">Genre <a className="text-red">*</a></label><br />
                    <input className="ml-[8%]" type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} required /> <a className="text-rayonblue ml-1">Homme</a>
                    <input className="ml-8" type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} required /> <a className="text-rayonblue ml-1">Femme</a>
                    <input className="ml-8" type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleChange} required /> <a className="text-rayonblue ml-1">Autre</a>
                </div><br />

                <FormInput className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Prénom" name="firstName" value={formData.firstName} onChange={handleChange} isStarred={true} />
                <FormInput className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Nom" name="lastName" value={formData.lastName} onChange={handleChange} isStarred={true} />

                <label className="text-rayonblue ml-[8%]">Date de naissance <a className="text-red">*</a></label><br />
                <input className="rounded-lg border border-rayonblue h-[2.3rem] ml-[8%] text-rayonlightblue mt-1 mb-[-10px] w-[20%]" type="date" name="birthday" value={formData.birthday} onChange={handleChange} /><br /><br />

                <FormInput className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Téléphone" name="phone" value={formData.phone} onChange={handleChange} isStarred={true} />
                <FormInput className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Adresse mail" name="email" value={formData.email} onChange={handleChange} isStarred={true} />

                <button type="submit" className='text-center-white bg-rayonorange w-[50%] ml-[25%] mb-3 mt-[10%] h-[2rem]'>Suivant</button>
            </form>
           <PageButton 
                className='text-center text-rayonorange bg-white w-[50%] ml-[25%] mb-[4%] h-[2rem] rounded-lg border border-rayonorange '
                buttonText="J'ai déjà un compte"
                page="../Login"
            />
        </>
            )
}

            export default RegisterStep1;