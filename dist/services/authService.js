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
exports.logoutHndlr = exports.dcdeCookie = exports.dcdeIdTknAndSetCookie = exports.findByEmailAndUpdateIfExistOrCreate = exports.getUserByEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const cookiesHlpr_1 = require("../helper/cookiesHlpr");
const DB = 'auth';
const COLLECTION = 'users';
const db = db_1.mongoClient.db(DB);
const userCollection = db.collection(COLLECTION);
const getUserByEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    try {
        return yield userCollection.findOne({ email });
    }
    catch (error) {
        throw new Error(`Error occured while getting user by email, and the error is ==> ${error}`);
    }
});
exports.getUserByEmail = getUserByEmail;
const findByEmailAndUpdateIfExistOrCreate = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, objToSet }) {
    try {
        return yield userCollection.findOneAndUpdate({ email }, {
            $set: Object.assign({}, objToSet)
        }, {
            upsert: true
        });
    }
    catch (error) {
        throw new Error(`Error occured in find and update email, and the error is ==> ${error}`);
    }
});
exports.findByEmailAndUpdateIfExistOrCreate = findByEmailAndUpdateIfExistOrCreate;
const dcdeIdTknAndSetCookie = ({ idToken, res }) => {
    try {
        // jwt decode from oAuth token
        const decoded = jsonwebtoken_1.default.decode(idToken !== null && idToken !== void 0 ? idToken : '');
        const { email, name, picture } = decoded;
        // attach cookie
        (0, cookiesHlpr_1.setCookie)(res, idToken);
        return { email, name, picture };
    }
    catch (error) {
        throw new Error(`Error occured in dcdeIdTknAndSetCookie, and the error is ==> ${error}`);
    }
};
exports.dcdeIdTknAndSetCookie = dcdeIdTknAndSetCookie;
const dcdeCookie = ({ cookie }) => {
    const decoded = jsonwebtoken_1.default.decode(cookie);
    const { email, picture, name } = decoded;
    return { email, picture, name };
};
exports.dcdeCookie = dcdeCookie;
const logoutHndlr = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, res }) {
    yield (0, exports.findByEmailAndUpdateIfExistOrCreate)({
        email,
        objToSet: { accessToken: '', expiryDate: 0, refreshToken: '', picture: '', name: '' }
    });
    (0, cookiesHlpr_1.clearCookie)(res);
});
exports.logoutHndlr = logoutHndlr;
