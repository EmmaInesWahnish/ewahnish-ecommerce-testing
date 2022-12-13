import logConfiguration from '../js/gralLogger.js';
import winston from 'winston';
import { createTransport } from 'nodemailer';
import  config from '../configurations/dotenvConfig.js';

const ilogger = winston.createLogger(logConfiguration);

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.mail_auth_user,
        pass: config.mail_auth_pass
    }
});

let from = config.mail_from;

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
        ilogger.info(`nodemailer message ${info}`)
    }
    catch(error){
        ilogger.error(`Error: Error trying to send email ${error}`)
    }
}

export default sendEmailGmail