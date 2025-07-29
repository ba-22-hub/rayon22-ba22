import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASS,
    },
});

// Mail options
const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Hello from Node.js!',
    text: 'This is a test email sent from Node.js using Nodemailer.',
};

// Mail sending
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Erreur lors de l’envoi :', error);
    } else {
        console.log('Email envoyé : ' + info.response);
    }
});
