const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${level}: ${timestamp} [${label}]  ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
        new transports.Console(),
        new transports.File({filename: 'combined.log', level: 'info'}),
        new transports.File({filename: 'error.log', level: 'error'})
    ]
});

export default logger;