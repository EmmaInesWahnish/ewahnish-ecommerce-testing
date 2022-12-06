
import mongoose from 'mongoose';
import envs from '../../dotenvConfig.js';
import MessageModel from '../Models/messages.js';
import MongoDbContainer from '../api/MongoDbContainer.js';
import winston from 'winston';
import logConfiguration from '../js/gralLogger';

const gLogger = winston.createLogger(logConfiguration);

const URL = envs.URL.toString();
const TheModel = MessageModel;

const connectToDb = async () => {
    try {
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        gLogger.info(`Estado de la conexion (MessageDao) ${mongoose.connection.readyState}`);
    } catch (error) {
        console.error("DB Error: ", error);
    }
}

class MessagesDaoMongoDb extends MongoDbContainer {

    constructor() {
        super()
        this.connectToDb = connectToDb;
        this.TheModel = TheModel;
    }

    async disconnect() {

    }
}

export default MessagesDaoMongoDb;