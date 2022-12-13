import passport from 'passport';
import local from 'passport-local';
import usersService from '../Models/Users.js';
import { createHash, isValidPassword } from '../utils.js';
import config from './dotenvConfig.js';
import jwt from 'jsonwebtoken';
const LocalStrategy = local.Strategy;
import {
    Strategy as JWTstrategy,
    ExtractJwt,
} from 'passport-jwt';

const initializePassport = () => {

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.server.JWT.SECRET_KEY,
      };
      
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        try {
            console.log(req.body)
            const { email, password, password2, name, phone, age } = req.body;
            if (!name || !email || !password || !password2) return done(null, false);
            if  (password !== password2) return done(null, false);
            let exists = await usersService.findOne({ email: email });
            if (exists) return done(null, false);
            let avatar = '/uploads/generic-avatar.jpg';
            let cart_number = 0
            let delivery_address = ''
            let result = await usersService.create({
                email: email,
                password: createHash(password),
                name: name,
                phone: phone,
                age: age,
                avatar: avatar,
                cart_number: cart_number,
                delivery_address: delivery_address
            })
            return done(null, result)
        }
        catch (error) {
            console.log(error)
            return done(error);
        }
    }))

    passport.use('login', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            if (!email || !password) return done(null, false);
            if ((email === config.envs.ADMIN_EMAIL ) && (password === config.envs.ADMIN_PWD)) {
                let user ={
                    _id:'631927924e599ac9efbed9d0',
                    id:'631927924e599ac9efbed9d0',
                    email: email,
                    name:"Admin",
                    phone:" ",
                    cart_number: '0',
                    avatar: "/uploads/generic-avatar.jpg",
                    isAdmin: true,
                    delivery_address:''                    
                };
                return done(null, user)
            }
            let user = await usersService.findOne({ email: email });
            if (!user) return done(null, false);
            if (!isValidPassword(user, password)) return done(null, false);
            user.isAdmin = false
            return done(null, user)
        } catch (error) {
            return done(error)
        }

    }))

    passport.use(
        new JWTstrategy(jwtOptions,
            async (jwtData, done) => {
                try {
                    const user = await usersService.findOne({ id: jwtData.id });
                    if (!user) return done(null, false);
            
                    done(null, user);
                  } catch (error) {
                    console.error(error);
                    done(error);
                  }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let result = await usersService.findOne({ _id: id })
        return done(null, result);
    })

}

export default initializePassport;
