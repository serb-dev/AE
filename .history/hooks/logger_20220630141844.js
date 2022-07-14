import { createLogger, format, transports } from 'winston';
import winston from 'winston/lib/winston/config';
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = () => {
    return winston.createLogger({
        level: 'debug',
        format: combine(
            timestamp(),
            myFormat
        )
        transports: [new winston]
    })
}