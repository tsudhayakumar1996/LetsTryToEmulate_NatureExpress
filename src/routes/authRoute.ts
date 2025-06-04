import { Router } from 'express'
import { UN_AUTHORIZED, UNKNOWN_USER } from '../const'
import { globalResFn } from '../helper/globalResFn'
import { oAuthClient } from '../helper/oAuthClient'
import { authenticate } from '../middleware'
import { dcdeIdTknAndSetCookie, findByEmailAndUpdateIfExistOrCreate, getUserByEmail } from '../services/authService'
import type { ExprsReqUsrExtntdType } from '../types/common'

const router = Router()

router.post('/login/google', async (req, res) => {
    const location = 'router - /login/google'
    try {
        // get oAuth token from oAuth client
        const { oAuth2Client } = oAuthClient()
        const {
            body: { code }
        } = req
        const {
            tokens: { id_token, refresh_token, expiry_date }
        } = await oAuth2Client.getToken(code)

        // decode adn set cookie
        const { email, name, picture } = dcdeIdTknAndSetCookie({
            idToken: id_token!,
            res
        })

        // create or update user details with email
        await findByEmailAndUpdateIfExistOrCreate({
            email,
            objToSet: { picture, name, refreshToken: refresh_token!, expiryDate: expiry_date!, accessToken: id_token! }
        })

        // send res to user and log the res
        globalResFn({
            res,
            code: 200,
            resBody: {
                user: email,
                location,
                ...{ picture, name }
            }
        })
    } catch (err) {
        globalResFn({
            res,
            code: 500,
            resBody: {
                user: UNKNOWN_USER,
                location,
                error: err
            }
        })
    }
})

router.get('/me', authenticate, async (req: ExprsReqUsrExtntdType, res) => {
    const location = 'router - /me'
    try {
        if (!req.user) throw new Error(UN_AUTHORIZED)
        const { email } = req.user

        const user = await getUserByEmail({ email })
        if (!user) throw new Error(UN_AUTHORIZED)

        globalResFn({
            res,
            code: 200,
            resBody: {
                user: email,
                location,
                name: user.name,
                picture: user.picture
            }
        })
    } catch (err) {
        globalResFn({
            res,
            code: 500,
            resBody: {
                user: UNKNOWN_USER,
                location,
                error: err
            }
        })
    }
})

export default router
