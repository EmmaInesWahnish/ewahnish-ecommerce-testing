import config from '../configurations/dotenvConfig.js';
import mongoose from 'mongoose';

const URL = config.envs.URL.toString();

export default class MongoClient {
    constructor() {
        this.connection = mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
    static getInstance = () => {
        if(!this.instance){
            this.instance = new MongoClient()
        }
        else {
            return this.instance
        }
    }
}