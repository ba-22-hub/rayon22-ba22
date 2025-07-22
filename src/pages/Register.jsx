// Importing dependencies
import { useState, useRef } from 'react';

// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput"
import PageButton from "../common/PageButton"
import FunctionButton from '../common/FunctionButton';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import Steper from '../common/Steper';


/**
 * The Register page.
 * @returns {React.ReactElement} Register component.
 */
function Register() {
    // useState init to store the form data in a JSON format
    const [formData, setFormData] = useState({
        'step1': {

            gender: '',
            firstName: '',
            lastName: '',
            birthday: '',
            phone: '',
            email: '',
        },
        'step2': {
            address: '',
            addAddress: '',
            city: '',
            postalCode: '',
            situation: '',
            quotient: '',
            wageType: '',
            otherWage: '',
            readInfo: false,
            acceptTerms: false
        }
    });
    const [step, setStep] = useState(1);

    // ref to the file field content
    // const fileInputRef = useRef(null);

    function changepage(step) {
        if (step > 3) {
            step = 3;
        }
        if (step < 1) {
            step = 1;
        }
        setStep(step);
    }

    // Fonction pour mettre à jour les données d'une étape
    const updateStepData = (step, data) => {
        setFormData(prev => ({
            ...prev,
            [step]: data
        }));
        console.log("Updated formData:", formData);
    };

    // function to set the new file formData field value whenever the input changes
    // function handleFileChange(e) {
    //     const file = e.target.files[0];
    //     setFormData({
    //         ...formData,
    //         file: file
    //     });
    // }

    // function to handle the form submit
    function handleSubmit(e) {

        // preparing wage info before sending
        const finalWage = formData.wageType === 'other' ? formData.otherWage : formData.wageType;

        formData.step2.wageType = finalWage;

        console.log("Form submitted with data:", formData, "Need API call to send this data");
        

        // manually emptying the file field
        // if (fileInputRef.current) {
        //     fileInputRef.current.value = '';
        // }

        // no need to reset the form data here it will be done after quiting the register page

        // alert('Votre compte a bien été créé ! Merci.');
        changepage(3); // go to the confirmation step
    }

    return (
        <>
            <div className="bg-white w-[918px] ml-[10%] mb-[5%]">
                <h1 className="text-center text-rayonblue text-[5em] leading-tight pt-[2%] font-bold">Création d’un compte</h1>
                <Steper steps={['Étape 1', 'Étape 2', 'Confirmation']} currentStep={step} />
                {step == 1 && (<RegisterStep1
                    data={formData.step1}
                    onDataChange={(data) => updateStepData('step1', data)}
                    onNext={() => changepage(step + 1)}
                />)}
                {step == 2 && (<RegisterStep2 
                    data={formData.step2}
                    onDataChange={(data) => updateStepData('step2', data)}
                    onNext={() => handleSubmit()}
                    onPrevious={() => changepage(step - 1)}
                />)}
                {step == 3 && (<RegisterStep3 mail={formData.step1.email} />)}

            </div>

        </>
    );
}

export default Register;
