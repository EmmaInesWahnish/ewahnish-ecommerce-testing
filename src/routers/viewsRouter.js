import express from 'express';
import { __dirname } from '../utils.js';
import { 
    viewsRegister, 
    viewsLogin, 
    viewsEmail, 
    viewsInfo, 
    viewsRegisterEmail 
} from '../controller/viewsController.js';

const viewsRouter = express.Router();

viewsRouter.get('/register', viewsRegister);

viewsRouter.get('/login', viewsLogin);

viewsRouter.post('/email', viewsEmail);

viewsRouter.get('/', viewsInfo);

viewsRouter.post('/register_email', viewsRegisterEmail)


export default viewsRouter
