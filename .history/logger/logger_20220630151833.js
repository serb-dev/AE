import myLogger from './myLogger';

let logger = null;

if (process.env.NODE_ENV !== 'production') {
    logger = myLogger
}

export default logger;