import winston from 'winston';
import logConfiguration from '../js/gralLogger.js'
import jwt from 'jsonwebtoken';
import config from '../configurations/dotenvConfig.js';
import usersService from '../Models/Users.js';

const ilogger = winston.createLogger(logConfiguration);

export const sessionRegister = async (req, res) => {
    res.status(200).send({ status: "success", payload: req.session.user })
}

export const sessionRegisterFail = async (req, res) => {
    console.log("Register failed");
    res.status(500).send({ status: "error", error: "Register failed" })
    req.logger.warn('Intento de registro fallido')
}

export const sessionLogin = async (req, res) => {
    req.session.user = {
        email: req.user.email,
        name: req.user.name,
        phone: req.user.phone,
        avatar: req.user.avatar,
        cart_number: req.user.cart_number,
        delivery_address: req.user.delivery_address,
        isAdmin: req.user.isAdmin,
        id: req.user._id
    };
    const body = { id: req.user.id };
    const token = jwt.sign({ 
        user: body }, 
        config.server.JWT.SECRET_KEY,
        {expiresIn:config.expires_in});

    let userEmail = req.session.user.email;

    let decodedToken = jwt.verify(token, config.server.JWT.SECRET_KEY);

    let payload = {
        token: decodedToken, session: req.session.user
    }
    ilogger.info(payload);

    res.status(200).send({ status: "success", payload: req.session.user, data: token })
}

export const sessionLoginFail = (req, res) => {
    console.log("login failed");
    res.status(500).send({ status: "error", error: "Login failed" })
    req.logger.warn('Intento de login fallido');
}

export const sessionLogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("error");
        res.status(200).send({ status: "success", payload: "Log Out successful" })
    })
}

export const sessionInfo = (req, res) => {
    res.json({
        status: 'information',
        user: req.session.user
    });
}

export const modifyUserAvatar = async (req, res) => {
    let auxurl = req.body.auxurl;
    let email = req.body.user_email;
    let avatar = {
        avatar: auxurl
    }
    try {
        await usersService.findOneAndUpdate({ email: email }, avatar, { returnOriginal: false });
        res.redirect('/');
    }
    catch (error) {
        console.log(error)
    }
}