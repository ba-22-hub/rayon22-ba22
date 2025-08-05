// Importing dependencies
import emailjs from '@emailjs/browser';

const serviceID = 'service_ebvylqd'
const publicKey = '_QJu22XnilS4i04rg'

function sendMail(templateID, templateParams) {
    return emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
            console.log('Email sent successfully:', response);
            return response;
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            throw error;
        });
}

export default sendMail;