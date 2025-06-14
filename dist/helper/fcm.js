"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const serviceAccPath = path_1.default.join(process.cwd(), 'make-green-firestore-firebase-adminsdk-fbsvc-36b86c3281.json');
const serviceAcc = JSON.parse((0, fs_1.readFileSync)(serviceAccPath, 'utf-8'));
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAcc)
    });
}
exports.default = firebase_admin_1.default;
