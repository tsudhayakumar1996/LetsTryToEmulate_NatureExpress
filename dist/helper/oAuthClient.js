"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuthClient = void 0;
const google_auth_library_1 = require("google-auth-library");
const oAuthClient = () => {
    const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_SECRET, 'postmessage');
    return { oAuth2Client };
};
exports.oAuthClient = oAuthClient;
