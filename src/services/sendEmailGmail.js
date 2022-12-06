import logConfiguration from '../js/gralLogger.js';
import winston from 'winston';
import { createTransport } from 'nodemailer';

const ilogger = winston.createLogger(logConfiguration);

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'ewahnish@gmail.com',
        pass: 'vlvzybaydltqdalp'
    }
});

let from = 'todoherramientas@ferreteriaindustrial.com';

const sendEmailGmail = async (destEmail, myMessage, mySubject, attachment) => {
    const mailOptions = {
        from: from,
        to: destEmail,
        subject: mySubject,
        html: myMessage,
        attachment: attachment
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        ilogger.info(`nodemailer test message ${info}`)
    }
    catch(error){
        ilogger.error(`Error: Error trying to send email ${error}`)
    }
}

export default sendEmailGmail