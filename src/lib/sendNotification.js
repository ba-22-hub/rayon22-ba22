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
            console.log('Notification sent successfully:', response);
            return response;
        })
        .catch(error => {
            console.error('Error sending notification:', error);
            throw error;
        });
}

export default sendNotification;