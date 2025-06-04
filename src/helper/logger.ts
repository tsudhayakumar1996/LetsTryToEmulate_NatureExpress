import path from 'path'
import winston from 'winston'

const { combine, timestamp, prettyPrint } = winston.format
const levelFilter = (level: string) => winston.format((info) => (info.level === level ? info : false))()

export const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), prettyPrint()),
    transports: [
        new winston.transports.File({
            filename: path.join('logs', 'success-responses.log'),
            format: combine(levelFilter('info'), timestamp(), prettyPrint())
        }),
        new winston.transports.File({
            filename: path.join('logs', 'error-responses.log'),
            format: combine(levelFilter('error'), timestamp(), prettyPrint())
        })
    ]
})
