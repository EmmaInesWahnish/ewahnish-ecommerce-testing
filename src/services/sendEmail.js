import logConfiguration from '../js/gralLogger.js';
import winston from 'winston';
import { createTransport } from 'nodemailer';

const ilogger = winston.createLogger(logConfiguration);

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'keegan.halvorson@ethereal.email',
        pass: 'mMbH3qUAKCKzXMqfRh'
    }
});

let from = 'todoherramientas@ferreteriaindustrial.com';

const sendEmail = async (destEmail, myMessage, mySubject, attachment) => {
    const mailOptions = {
        from: from,
        to: destEmail,
        subject: mySubject,
        html: myMessage,
        attachments: attachment
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        ilogger.info(`nodemailer test message ${info}`)
    }
    catch(error){
        ilogger.error(`Error: Error trying to send email ${error}`)
    }
}

export default sendEmail