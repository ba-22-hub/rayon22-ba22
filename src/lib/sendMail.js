// Importing dependencies
import emailjs from '@emailjs/browser';

const serviceID = 'service_ebvylqd'
const publicKey = '_QJu22XnilS4i04rg'

function sendMail(templateID, templateParams) {
    return emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
            Store.addNotification({
                title: "E-mail envoyé avec succès",
                message: response,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
            return response;
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            Store.addNotification({
                title: "Erreur lors de l'envoi de l'e-mail",
                message: error.message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
            throw error;
        });
}

export default sendMail;