import { OAuth2Client } from 'google-auth-library'

export const oAuthClient = () => {
    const oAuth2Client = new OAuth2Client(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_SECRET, 'postmessage')
    return { oAuth2Client }
}
