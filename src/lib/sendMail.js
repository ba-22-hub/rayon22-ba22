// Importing dependencies
import emailjs from '@emailjs/browser';
import { displayNotification } from '@lib/displayNotification.jsx'

const serviceID = 'service_ebvylqd'
const publicKey = '_QJu22XnilS4i04rg'

function sendMail(templateID, templateParams) {
    return emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
            displayNotification("E-mail envoyé avec succès", response, "success")
            return response;
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            displayNotification("Erreur lors de l'envoi de l'e-mail", error.message, "danger")
            throw error;
        });
}

export default sendMail;