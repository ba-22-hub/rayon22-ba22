// Importing dependencies
import { useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';

// Importing common components
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';
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
        },
        'step3': {
            "password": ''
        }
    });
    const [step, setStep] = useState(1);

    function changepage(step) {
        if (step > 4) {
            step = 4;
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
    };

    // function to handle the form submit
    async function handleSubmit(e) {

        console.log("Form submitted with data:", formData, "Need API call to send this data");

        const email = formData.step1.email;
        const password = formData.step3.password;

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: "http://localhost:5173/#/login" // TODO : change this URL to the production one
            }
        });

        if (error) {
            console.error("Erreur lors de la création Supabase:", error.message);
            return;
        }

        // Saving locally the user info to use it after the mail verification
        localStorage.setItem("pendingUserData", JSON.stringify(formData));

        changepage(4); // go to the confirmation step

    }

    return (
        <>
            <div className="bg-white w-[60%] ml-[20%] mb-[5%]">
                <h1 className="text-center text-rayonblue text-[5em] leading-tight pt-[2%] font-bold">Création d’un compte</h1>
                <Steper steps={['Étape 1', 'Étape 2', 'Mot de passe', 'Confirmation']} currentStep={step} />
                {step == 1 && (<RegisterStep1
                    data={formData.step1}
                    onDataChange={(data) => updateStepData('step1', data)}
                    onNext={() => changepage(step + 1)}
                />)}
                {step == 2 && (<RegisterStep2
                    data={formData.step2}
                    onDataChange={(data) => updateStepData('step2', data)}
                    onNext={() => changepage(step + 1)}
                    onPrevious={() => changepage(step - 1)}
                />)}
                {step == 3 && (<RegisterStep3
                    onDataChange={(data) => updateStepData('step3', data)}
                    onNext={() => handleSubmit()}
                />)}
                {step == 4 && (<RegisterStep4 mail={formData.step1.email} />)}


            </div>

        </>
    );
}

export default Register;
