"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fcmForMultiTok = exports.fcmForSingleTok = void 0;
const fcm_1 = __importDefault(require("./fcm"));
const fcmForSingleTok = (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, body, token }) {
    try {
        const message = {
            data: {
                title,
                body
            },
            token
        };
        const res = yield fcm_1.default.messaging().send(message);
        return res;
    }
    catch (err) {
        throw new Error(String(err));
    }
});
exports.fcmForSingleTok = fcmForSingleTok;
const fcmForMultiTok = (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, body, tokens }) {
    try {
        const message = {
            data: {
                title,
                body
            },
            tokens
        };
        const res = yield fcm_1.default.messaging().sendEachForMulticast(message);
        return res;
    }
    catch (err) {
        throw new Error(String(err));
    }
});
exports.fcmForMultiTok = fcmForMultiTok;
