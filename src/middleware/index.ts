import type { Response } from 'express'
import { FOUND_ANOTHER_SESSION_OR_UN_AUTHORIZED, UN_AUTHORIZED, UNKNOWN_USER } from '../const'
import { globalResFn } from '../helper/globalResFn'
import { oAuthClient } from '../helper/oAuthClient'
import {
    dcdeCookie,
    dcdeIdTknAndSetCookie,
    findByEmailAndUpdateIfExistOrCreate,
    getUserByEmail,
    logoutHndlr
} from '../services/authService'
import { ExprsReqUsrExtntdType } from '../types/common'

export const authenticate = async (req: ExprsReqUsrExtntdType, res: Response, next: any) => {
    const location = 'middleware - authenticate'
    try {
        const {
            cookies: { access_token: cookie }
        } = req

        if (!cookie) {
            throw new Error(UN_AUTHORIZED)
        }

        // attach decoded user obj with req
        const { email: decodedEmail } = dcdeCookie({ cookie })
        req.user = { email: decodedEmail }

        const user = await getUserByEmail({ email: decodedEmail })
        if (!user) {
            throw new Error(UN_AUTHORIZED)
        }
        const { accessToken } = user

        if (accessToken !== cookie) {
            // token miss use case
            await logoutHndlr({ email: decodedEmail, res })
            throw new Error(FOUND_ANOTHER_SESSION_OR_UN_AUTHORIZED)
        }

        // get refresh token
        const now = Date.now()
        if (user.expiryDate < now) {
            const { oAuth2Client } = oAuthClient()
            oAuth2Client.setCredentials({ refresh_token: user.refreshToken })
            const {
                credentials: { id_token, expiry_date, refresh_token }
            } = await oAuth2Client.refreshAccessToken()

            // decode adn set cookie
            const { email } = dcdeIdTknAndSetCookie({
                idToken: id_token!,
                res
            })

            // update user details with email
            await findByEmailAndUpdateIfExistOrCreate({
                email,
                objToSet: { accessToken: id_token, expiryDate: expiry_date, refreshToken: refresh_token }
            })
        }

        next()
    } catch (err) {
        globalResFn({
            res,
            code: 500,
            resBody: { location, user: UNKNOWN_USER, error: err }
        })
    }
}
