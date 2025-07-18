
import '../styles/register.css'
import imageMail from '../assets/shapes/sendedMail.png';

import { useState, useRef } from 'react';


function RegisterStep3({mail}) {



    return (
        <>
            <div className='img-center'>
                <img src={imageMail}/>
            </div>
            <h2 className='center'>Email de confirmation</h2>
            <p className='center'><black>Un email de confirmation a été envoyé à  </black><span className="email">{mail}</span><black> afin de vérifier la validité de l'adresse. Une fois reçu, veuillez cliquer sur le lien pour finaliser votre inscription</black></p>
            <button className='register-button'>Re-envoyer le mail</button>
        </>
    ) 
}



export default RegisterStep3;