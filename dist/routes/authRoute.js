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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const const_1 = require("../const");
const globalResFn_1 = require("../helper/globalResFn");
const oAuthClient_1 = require("../helper/oAuthClient");
const middleware_1 = require("../middleware");
const authService_1 = require("../services/authService");
const router = (0, express_1.Router)();
router.post('/login/google', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = 'router - /login/google';
    try {
        // get oAuth token from oAuth client
        const { oAuth2Client } = (0, oAuthClient_1.oAuthClient)();
        const { body: { code } } = req;
        const { tokens: { id_token, refresh_token, expiry_date } } = yield oAuth2Client.getToken(code);
        // decode adn set cookie
        const { email, name, picture } = (0, authService_1.dcdeIdTknAndSetCookie)({
            idToken: id_token,
            res
        });
        // create or update user details with email
        yield (0, authService_1.findByEmailAndUpdateIfExistOrCreate)({
            email,
            objToSet: { picture, name, refreshToken: refresh_token, expiryDate: expiry_date, accessToken: id_token }
        });
        // send res to user and log the res
        (0, globalResFn_1.globalResFn)({
            res,
            code: 200,
            resBody: Object.assign({ user: email, location }, { picture, name })
        });
    }
    catch (err) {
        (0, globalResFn_1.globalResFn)({
            res,
            code: 500,
            resBody: {
                user: const_1.UNKNOWN_USER,
                location,
                error: err
            }
        });
    }
}));
router.get('/me', middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = 'router - /me';
    let emailBfre = '';
    try {
        if (!req.user)
            throw new Error(const_1.UN_AUTHORIZED);
        const { email } = req.user;
        emailBfre = email;
        const user = yield (0, authService_1.getUserByEmail)({ email });
        if (!user)
            throw new Error(const_1.UN_AUTHORIZED);
        (0, globalResFn_1.globalResFn)({
            res,
            code: 200,
            resBody: {
                user: email,
                location,
                name: user.name,
                picture: user.picture
            }
        });
    }
    catch (err) {
        (0, globalResFn_1.globalResFn)({
            res,
            code: 500,
            resBody: {
                user: emailBfre,
                location,
                error: err
            }
        });
    }
}));
router.post('/logout', middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = 'router - /logout';
    let emailBfre = '';
    try {
        if (!req.user)
            throw new Error(const_1.UN_AUTHORIZED);
        const { email } = req.user;
        emailBfre = email;
        yield (0, authService_1.logoutHndlr)({ email: email, res });
        (0, globalResFn_1.globalResFn)({
            res,
            code: 200,
            resBody: {
                user: email,
                location,
                message: const_1.LOGGED_OUT_SUCCESSFULLY
            }
        });
    }
    catch (err) {
        (0, globalResFn_1.globalResFn)({
            res,
            code: 500,
            resBody: {
                user: emailBfre,
                location,
                error: err
            }
        });
    }
}));
exports.default = router;
