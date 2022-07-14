const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${level}: ${timestamp} ${message}`;
});

const logger = createLogger({
  format: combine(
    
    timestamp({ format: "HH:mm:ss" }),
    myFormat
  ),
  transports: [
        new transports.Console(),
        new transports.File({filename: 'combined.log', level: 'info'}),
        new transports.File({filename: 'error.log', level: 'error'})
    ]
});

export default logger;