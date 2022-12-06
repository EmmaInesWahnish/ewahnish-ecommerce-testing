import express from 'express';
import passport from 'passport';
import { 
    sessionRegister, 
    sessionRegisterFail, 
    sessionLogin, 
    sessionLoginFail, 
    sessionLogout, 
    sessionInfo,
    modifyUserAvatar 
} from '../controller/sessionController.js'

const sessionRouter = express.Router();

sessionRouter.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}), sessionRegister);

sessionRouter.get('/registerfail', sessionRegisterFail);

sessionRouter.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}), sessionLogin);

sessionRouter.post('/avatar', modifyUserAvatar);

sessionRouter.get('/loginfail', sessionLoginFail);

sessionRouter.get('/logout', sessionLogout);

sessionRouter.get('/', sessionInfo);

export default sessionRouter
