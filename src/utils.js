import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import winston from 'winston';
import logConfiguration from './js/gralLogger.js'

/* Bycrypts */
export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

export const gralLogger = winston.createLogger(logConfiguration)

/*Middleware to use with routes*/
export const logger = () => (req, res, next) => {
    req.logger = gralLogger;
    next();
}

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

