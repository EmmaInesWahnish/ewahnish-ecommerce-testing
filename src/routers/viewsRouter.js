import express from 'express';
import { __dirname } from '../utils.js';
import config from '../configurations/dotenvConfig.js';
import {
    viewsRegister,
    viewsLogin,
    viewsEmail,
    viewsInfo,
    viewsRegisterEmail
} from '../controller/viewsController.js';

const viewsRouter = express.Router();

let admin_enail = config.admin_email;

let configuration_info = {
    puerto: config.server.PORT,
    modo: config.server.MODE,
    ttl: config.time_to_live,
    base_route: config.server.routes.base,
    base_de_datos: process.env.SELECTED_DB
}

let mem_usage = process.memoryUsage();

for (let key in mem_usage) {
    let newValue = Math.round(mem_usage[key] / 1024 / 1024 * 100) / 100;
    mem_usage[key] = newValue
}

let server_info = {
    carpeta: process.cwd(),
    title: process.title,
    version: process.version,
    rss: mem_usage.rss,
    heap: mem_usage.heapTotal,
    used: mem_usage.heapUsed,
    external: mem_usage.external,
    buffers: mem_usage.arrayBuffers
}

viewsRouter.get('/register', viewsRegister);

viewsRouter.get('/login', viewsLogin);

viewsRouter.post('/email', viewsEmail);

viewsRouter.get('/', viewsInfo);

viewsRouter.post('/register_email', viewsRegisterEmail)

viewsRouter.get('/server_info', (req, res) => {
})

viewsRouter.get('/configuration_info', (req, res) => {
    if (req.user != undefined) {
        if (req.user.email === admin_enail) {
            res.render('configuration_info.handlebars', { configuration_info });
        }
        else{
            res.render('unauthorised.handlebars')
        }
    } else {
        res.render('unauthorised.handlebars')
    }
})

export default viewsRouter
