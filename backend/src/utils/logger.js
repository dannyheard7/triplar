import winston from "winston";
import {LOG_DIR} from "../config/logger";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: LOG_DIR + 'error.log', level: 'error' }),
        new winston.transports.File({ filename: LOG_DIR + 'combined.log' })
    ]
});

export default logger;