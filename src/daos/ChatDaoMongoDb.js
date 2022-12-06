
import mongoose from 'mongoose';
import config from '../configurations/dotenvConfig.js'
import MessageModel from '../Models/messages.js';
import MongoDbContainer from '../api/MongoDbContainer.js';
import winston from 'winston';
import logConfiguration from '../js/gralLogger.js';

const gLogger = winston.createLogger(logConfiguration);

const URL = config.envs.URL.toString();
const TheModel = MessageModel;

const connectToDb = async () => {
    try {
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        //gLogger.info(`Estado de la conexion (ChatDao) ${mongoose.connection.readyState}`);
    } catch (error) {
        console.error("DB Error: ", error);
    }
}

class ChatDaoMongoDb extends MongoDbContainer {

    constructor() {
        super()
        this.connectToDb = connectToDb;
        this.TheModel = TheModel;
    }

    async disconnect() {

    }
}

export default ChatDaoMongoDb;