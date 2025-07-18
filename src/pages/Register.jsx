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

// Importing the style
import '../styles/register.css'

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
        otherWage: '',
        readInfo: false,
        acceptTerms: false,
        file: null
    });

    // ref to the file field content
    const fileInputRef = useRef(null);

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

    // function to set the new file formData field value whenever the input changes
    function handleFileChange(e) {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            file: file
        });
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
            otherWage: '',
            readInfo: false,
            acceptTerms: false,
            file: null
        });

        // manually emptying the file field
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        alert('Votre compte a bien été créé ! Merci.');
    }

    return (
        <>
            <div className="register">
                <h1>Création d’un compte</h1>

                <RegisterStep1 />
                <RegisterStep2 />
                <RegisterStep3  mail={"mail.example@gmail.com"}/>
                

              

                <PageButton buttonText={'Retour à la page d\'accueil'}  page={'/'} />
            </div>
        </>
    );
}

export default Register;
