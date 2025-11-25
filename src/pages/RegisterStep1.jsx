// Importing dependencies
import { useState, useEffect } from 'react';
import { displayNotification } from '@lib/displayNotification.js';

// Importing common components
import FormInput from "@common/FormInput"
import PageButton from '@common/PageButton';



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

        displayNotification("Formulaire soumis avec succès", "", "success")
        onNext();

    }

    return (
        <>
            <span style={{ display: 'block', marginTop: '4rem' }}></span>
            <p className='text-red text-center text-[1.2rem] mlr-[8%] '>Les informations avec une étoile rouge sont indispensables pour instruire votre dossier.</p>
            <span style={{ display: 'block', marginTop: '2rem' }}></span>
            
            <form onSubmit={handleSubmit}>
                {/* Gender */}
                <div>
                    <label className="ml-[8%] text-rayonblue">Genre <a className="text-red">*</a></label><br />
                    <input className="ml-[8%]" type="radio" name="gender" value="Homme" checked={formData.gender === "Homme"} onChange={handleChange} required /> <a className="text-rayonblue ml-1">Homme</a>
                    <input className="ml-8" type="radio" name="gender" value="Femme" checked={formData.gender === "Femme"} onChange={handleChange} required /> <a className="text-rayonblue ml-1">Femme</a>
                    <input className="ml-8" type="radio" name="gender" value="Autre" checked={formData.gender === "Autre"} onChange={handleChange} required /> <a className="text-rayonblue ml-1">Autre</a>
                </div><br />
                {/* First name  */}
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Prénom" name="firstName" value={formData.firstName} onChange={handleChange} isStarred={true} />
                {/* Last name  */}
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Nom" name="lastName" value={formData.lastName} onChange={handleChange} isStarred={true} />
                {/* Phone number */}
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Téléphone" name="phone" value={formData.phone} onChange={handleChange} isStarred={true} />
                {/* Mail */}
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Adresse mail" name="email" value={formData.email} onChange={handleChange} isStarred={true} />
                {/* Street */}
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Rue :" name="address" value={formData.street} onChange={handleChange} isStarred={true}/>
                {/* add addresse */}
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Complément d'adresse :" name="addAddress" value={formData.addr} onChange={handleChange} />
                {/* City  */}
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Votre commune :" name="city" value={formData.region} onChange={handleChange} isStarred={true} />
                {/* Post code */}
                <FormInput labelClassName="ml-[8%]" className="w-[84%] h-[2.3rem] ml-[8%] rounded-lg border border-rayonblue mb-2 mt-1" inputText="Code postal :" name="postalCode" value={formData.postalCode} onChange={handleChange} isStarred={true} />

                <button type="submit" className='text-center-white bg-rayonorange w-[80%] ml-[10%] lg:w-[50%] lg:ml-[25%] mb-3 mt-10 h-[2rem]'>Suivant</button>
            </form>
            <PageButton
                className='text-center text-rayonorange bg-white w-[80%] ml-[10%] lg:w-[50%] lg:ml-[25%] mb-[4%] h-[2rem] rounded-lg border border-rayonorange '
                buttonText="J'ai déjà un compte"
                page="../Login"
            />
        </>
    )
}

export default RegisterStep1;