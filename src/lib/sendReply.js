// Importing dependencies
import { sendMail } from '@lib/sendMail.js';

const templateID = 'template_t2ldyj5';

function sendReply({ email, name, reply }) {
    const templateParams = {
        email: email,
        ame: name,
        message: reply
    };

    return sendMail(templateID, templateParams)
        .then(response => {
            console.log('Reply sent successfully:', response);
            return response;
        })
        .catch(error => {
            console.error('Error sending reply:', error);
            throw error;
        });
}

export default sendReply;