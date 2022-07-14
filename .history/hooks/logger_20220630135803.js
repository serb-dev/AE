const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });