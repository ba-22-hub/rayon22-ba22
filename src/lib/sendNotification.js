// Importing dependencies
import sendMail from '@lib/sendMail.js';

const templateID = 'template_k4m4rco';

function sendNotification({ email, name }) {
    const templateParams = {
        email: email,
        name: name,
    };

    return sendMail(templateID, templateParams)
        .then(response => {
            Store.addNotification({
                title: "Notification envoyée avec succès",
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
            console.error('Error sending notification:', error);
            Store.addNotification({
                title: "Erreur lors de l'envoi de la notification",
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

export default sendNotification;