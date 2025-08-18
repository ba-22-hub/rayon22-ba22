// Importing dependencies
import { useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { useNavigate } from 'react-router-dom';
import { displayNotification } from '@lib/displayNotification.js';

import { useAuthor } from "@context/AuthorContext.jsx"

// Importing common components
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';
import Steper from '@common/Steper';


/**
 * The Register page.
 * @returns {React.ReactElement} Register component.
 */
function Register() {
    const navigate = useNavigate()
    const { user, logout } = useAuthor()
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
            displayNotification("Échec de la soumission du formulaire", insertError.message, "danger")
            return;
        }

        // Saving locally the user info to use it after the mail verification
        localStorage.setItem("pendingUserData", JSON.stringify(formData));

        changepage(4); // go to the confirmation step

    }

    function handleDeconnection() {
        logout()
        navigate('/login')
    }

    if (user) {
        return (
            <>
                <div className="w-[66vw] mx-auto p-[4vw] bg-white rounded-2xl shadow-sm mb-[4vw] flex flex-col items-center text-center">
                    <h1 className="text-center text-rayonblue text-[5em] leading-tight pt-[2%] font-bold">Vous possédez déjà un compte</h1>
                    <p>Pour accéder à la création d'un compte, merci de vous déconnecter</p>
                    <button
                        className="text-white bg-rayonorange w-[30vw] mb-3 mt-[10vh] h-[2rem]"
                        onClick={() => navigate('/account')}
                    >
                        Accéder à mon compte
                    </button>

                    <button
                        className="text-white bg-red w-[30vw] mb-3 mt-[2vh] h-[2rem]"
                        onClick={handleDeconnection}
                    >
                        Se déconnecter
                    </button>
                </div>
            </>
        )
    } else {
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
                </div >

            </>
        );
    }
}

export default Register;
