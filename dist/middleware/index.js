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
exports.authenticate = void 0;
const const_1 = require("../const");
const globalResFn_1 = require("../helper/globalResFn");
const oAuthClient_1 = require("../helper/oAuthClient");
const authService_1 = require("../services/authService");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const location = 'middleware - authenticate';
    try {
        const { cookies: { access_token: cookie } } = req;
        if (!cookie) {
            throw new Error(const_1.UN_AUTHORIZED);
        }
        // attach decoded user obj with req
        const { email: decodedEmail } = (0, authService_1.dcdeCookie)({ cookie });
        req.user = { email: decodedEmail };
        const user = yield (0, authService_1.getUserByEmail)({ email: decodedEmail });
        if (!user) {
            throw new Error(const_1.UN_AUTHORIZED);
        }
        const { accessToken } = user;
        if (accessToken !== cookie) {
            // token miss use case
            yield (0, authService_1.logoutHndlr)({ email: decodedEmail, res });
            throw new Error(const_1.FOUND_ANOTHER_SESSION_OR_UN_AUTHORIZED);
        }
        // get refresh token
        const now = Date.now();
        if (user.expiryDate < now) {
            const { oAuth2Client } = (0, oAuthClient_1.oAuthClient)();
            oAuth2Client.setCredentials({ refresh_token: user.refreshToken });
            const { credentials: { id_token, expiry_date, refresh_token } } = yield oAuth2Client.refreshAccessToken();
            // decode adn set cookie
            const { email } = (0, authService_1.dcdeIdTknAndSetCookie)({
                idToken: id_token,
                res
            });
            // update user details with email
            yield (0, authService_1.findByEmailAndUpdateIfExistOrCreate)({
                email,
                objToSet: { accessToken: id_token, expiryDate: expiry_date, refreshToken: refresh_token }
            });
        }
        next();
    }
    catch (err) {
        (0, globalResFn_1.globalResFn)({
            res,
            code: 500,
            resBody: { location, user: const_1.UNKNOWN_USER, error: err }
        });
    }
});
exports.authenticate = authenticate;
