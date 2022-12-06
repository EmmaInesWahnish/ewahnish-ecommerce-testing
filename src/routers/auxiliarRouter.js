import express from 'express';
import { saveAuxurl, getAuxurl } from '../controller/auxiliarController.js';

const auxiliarRouter = express.Router();

auxiliarRouter.post('/', saveAuxurl);

auxiliarRouter.get('/',getAuxurl);

export default auxiliarRouter
