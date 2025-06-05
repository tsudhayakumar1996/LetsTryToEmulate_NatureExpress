"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookie = exports.setCookie = void 0;
const cookieOption = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
    // maxAge: 60 * 60 * 1000
};
const setCookie = (res, cookieToken) => {
    res.cookie('access_token', cookieToken, cookieOption);
};
exports.setCookie = setCookie;
const clearCookie = (res) => {
    res.clearCookie('access_token', cookieOption);
};
exports.clearCookie = clearCookie;
