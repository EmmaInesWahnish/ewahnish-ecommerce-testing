import express from 'express';
import { __dirname } from '../utils.js';
import { viewsRegister, viewsLogin, viewsEmail, viewsInfo } from '../controller/viewsController.js';

const viewsRouter = express.Router();

viewsRouter.get('/register', viewsRegister);

viewsRouter.get('/login', viewsLogin);

viewsRouter.post('/email', viewsEmail);

viewsRouter.get('/', viewsInfo);

export default viewsRouter
