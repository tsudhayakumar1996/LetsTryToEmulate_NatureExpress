"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
// import { join } from 'path'
const node_path_1 = require("node:path");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
dotenv_1.default.config();
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true
};
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('public'));
// routes
app.use('/', homeRoute_1.default);
app.use('/auth', authRoute_1.default);
// ui routes
app.use('/auth/login', (_, res) => {
    res.sendFile((0, node_path_1.join)(__dirname, '../public/index.html'));
});
// server
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server running on port:${PORT}`);
});
