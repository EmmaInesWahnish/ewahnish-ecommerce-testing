import express from 'express';
import cors from 'cors';
import { logger } from './utils.js';
import routerProducts from './routers/routerProducts.js';
import routerCart from './routers/routerCart.js';
import config from './configurations/dotenvConfig.js';
import viewsRouter from './routers/viewsRouter.js';
import sessionRouter from './routers/sessionRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import auxiliarRouter from './routers/auxiliarRouter.js';
import routerOrder from './routers/routerOrder.js';
import ChatDaoMongoDb from './daos/ChatDaoMongoDb.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import initializePassport from './configurations/passportConfig.js';
import passport from 'passport';
import { createServer } from "http";
import { Server } from "socket.io";
import { __dirname } from './utils.js';
import cluster from 'cluster';
import { cpus } from 'os';
import winston from 'winston';
import logConfiguration from './js/gralLogger.js';
import terminate from './js/terminate.js';
import handlebars from 'express-handlebars';

const app = express();

const ilogger = winston.createLogger(logConfiguration);

const modeCluster = config.server.MODE;

const time_to_live = config.server.TIME_TO_LIVE;

if (modeCluster === 'CLUSTER' && cluster.isPrimary) {
    const numCPUs = cpus().length

    ilogger.info(`Número de procesadores: ${numCPUs}`)
    ilogger.info(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        ilogger.error('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
}
else {
    const httpServer = createServer(app);
    const io = new Server(httpServer);

    app.use(cors({ credentials: true }))
    // this code is necessary for express to understand json format
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static("public"));

    app.use(logger());

    const URL = config.envs.URL.toString();

    const Messages = new ChatDaoMongoDb();

    const sessionMiddleware = session({
        store: MongoStore.create({
            mongoUrl: URL,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: time_to_live
        }),
        secret: config.server.SESSION.SECRET_KEY,
        resave: false,
        saveUninitialized: false
    })

    app.use(sessionMiddleware);

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

    io.use(wrap(sessionMiddleware));

    let list = [];

    initializePassport();
    app.use(passport.initialize());
    app.use(passport.session());

    app.engine('handlebars', handlebars.engine());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');

    app.use(
        '/api/productos',
        passport.authenticate("jwt", { session: false }),
        routerProducts);
    app.use(
        '/api/carrito',
        passport.authenticate("jwt", { session: false }),
        routerCart);
    app.use('/api/up', uploadRouter);
    app.use('/api/auxiliar', auxiliarRouter);
    app.use('/', viewsRouter);
    app.use('/api/sessions', sessionRouter);
    app.use(
        '/api/ordenes',
        passport.authenticate('jwt', { session: false }),
        routerOrder);

    app.all('*', (req, res) => {
        res.status(404).send({
            error: -2,
            message: `404 - ruta no encontrada ${req.path}`
        })
        req.logger.error(`404 - ruta no encontrada ${req.path}`)
    })

    io.on('connection', async (socket) => {
        let user_session = socket.request.session;

        let userEmail;

        if (user_session.userEmail) {
            userEmail = user_session.user.email;
        }
        else {
            userEmail = 'c@c';
        }

        try {
            list = await Messages.getAll();
            for (let msg in list) {
                socket.emit('old messages', list[msg]);
            }
        }
        catch (error) {
            console.log(error);
        }

        io.sockets.emit('new user', `${userEmail} ha ingresado al Centro de Mensajes`);


        socket.on('disconnect', () => {
            io.sockets.emit('new user', `${userEmail} ha abandonado el Centro de mensajes`);
        });

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
            addToMessageList(msg)
        })


    });

    const addToMessageList = async (msg) => {

        try {
            await Messages.save(msg);
        }
        catch (error) {
            console.log(error)
        }
        return list;
    }



    /* Server Listen */
    const port = config.server.PORT;
    const server = httpServer.listen(port, () => {
        console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
    });
    const exitHandler = terminate(server, {
        coredump: false,
        timeout: 500
    })
    process.on('exit', exitHandler(1, 'Excepcion no Controlada'));
    process.on('unhandledRejection',exitHandler(1, 'Promesa no controlada'));
    process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
    process.on('SIGINT', exitHandler(0, 'SIGINT'))
    server.on("error", (error) => ilogger.error(`Error in server ${error}`))
}