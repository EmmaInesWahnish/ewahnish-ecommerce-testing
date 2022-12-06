import winston from 'winston';
const { combine, timestamp, json } = winston.format;

const errorFilter = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
});
const warnFilter = winston.format((info, opts) => {
    return info.level === 'warn' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
});

const httpFilter = winston.format((info, opts) => {
    return info.level === 'http' ? info : false;
});

const verboseFilter = winston.format((info, opts) => {
    return info.level === 'verbose' ? info : false;
});

const debugFilter = winston.format((info, opts) => {
    return info.level === 'debug' ? info : false;
});

const logConfiguration = {
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({}),
        new winston.transports.File({ 
            level: 'info', 
            filename: 'info.log',
            format: combine(infoFilter(),timestamp(),json())
        }),
        new winston.transports.File({ 
            level: 'warn', 
            filename: 'warn.log',
            format: combine(warnFilter(),timestamp(),json())
        }),
        new winston.transports.File({ 
            level: 'error', 
            filename: 'error.log',
            format: combine(errorFilter(), timestamp(), json())
        })
    ]
}

export default logConfiguration

