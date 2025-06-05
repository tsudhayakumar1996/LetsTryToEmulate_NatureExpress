"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, prettyPrint } = winston_1.default.format;
const levelFilter = (level) => winston_1.default.format((info) => (info.level === level ? info : false))();
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), prettyPrint()),
    transports: [
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'success-responses.log'),
            format: combine(levelFilter('info'), timestamp(), prettyPrint())
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'error-responses.log'),
            format: combine(levelFilter('error'), timestamp(), prettyPrint())
        })
    ]
});
