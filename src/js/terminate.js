import logConfiguration from './gralLogger.js';
import winston from 'winston';

const ilogger = winston.createLogger(logConfiguration);

const terminate = (server, options = { coredump: false, timeout: 500 }) => {

  const exit = code => {
    options.coredump ? process.abort() : process.exit(code)
  }

  return (code, reason) => (err, promise) => {
    if (err && err instanceof Error) {
      ilogger.error(err.message, err.stack)
    }
    
    server.close(exit)
    setTimeout(exit, options.timeout).unref()
  }
}

export default terminate