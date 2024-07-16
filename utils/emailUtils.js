require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log('Email verification error:', error);
    } else {
        console.log('Email server is ready to take our messages');
    }
});

exports.sendActivationEmail = (email, token) => {
    const url = `${process.env.FRONTEND_URL}/activate/${token}`;

    transporter.sendMail({
        to: email,
        subject: 'Account Activation',
        html: `<p>Please click <a href="${url}">here</a> to activate your account.</p>`
    }, (error, info) => {
        if (error) {
            console.log('Error sending activation email:', error);
        } else {
            console.log('Activation email sent:', info.messageId);
        }
    });
};

exports.sendResetPasswordEmail = (email, token) => {
    const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    transporter.sendMail({
        to: email,
        subject: 'Password Reset',
        html: `<p>Please click <a href="${url}">here</a> to reset your password.</p>`
    }, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};
