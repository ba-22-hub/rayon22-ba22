// Importing dependencies
import sendMail from '@lib/sendMail.js';

const templateID = 'template_t2ldyj5';

function sendReply({ email, name, reply }) {
    const templateParams = {
        email: email,
        ame: name,
        message: reply
    };

    return sendMail(templateID, templateParams)
        .then(response => {
            Store.addNotification({
                title: "Réponse envoyée avec succès",
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
        .catch(error => {
            console.error('Error sending reply:', error);
            Store.addNotification({
                title: "Erreur lors de l'envoi de la réponse",
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

export default sendReply;