import type { Response } from 'express'
import jwt from 'jsonwebtoken'
import { mongoClient } from '../config/db'
import { clearCookie, setCookie } from '../helper/cookiesHlpr'
import { OAuthDecodedType, UserType } from '../types/common'

const DB = 'auth'
const COLLECTION = 'users'

const db = mongoClient.db(DB)
const userCollection = db.collection(COLLECTION)

export const getUserByEmail = async ({ email }: { email: string }) => {
    try {
        return await userCollection.findOne<UserType>({ email })
    } catch (error) {
        throw new Error(`Error occured while getting user by email, and the error is ==> ${error}`)
    }
}

export const findByEmailAndUpdateIfExistOrCreate = async ({
    email,
    objToSet
}: {
    email: string
    objToSet: Record<string, any>
}) => {
    try {
        return await userCollection.findOneAndUpdate(
            { email },
            {
                $set: { ...objToSet }
            },
            {
                upsert: true
            }
        )
    } catch (error) {
        throw new Error(`Error occured in find and update email, and the error is ==> ${error}`)
    }
}

export const dcdeIdTknAndSetCookie = ({ idToken, res }: { idToken: string; res: Response }) => {
    try {
        // jwt decode from oAuth token
        const decoded = jwt.decode(idToken ?? '') as OAuthDecodedType
        const { email, name, picture } = decoded

        // attach cookie
        setCookie(res, idToken)

        return { email, name, picture }
    } catch (error) {
        throw new Error(`Error occured in dcdeIdTknAndSetCookie, and the error is ==> ${error}`)
    }
}

export const dcdeCookie = ({ cookie }: { cookie: string }) => {
    const decoded = jwt.decode(cookie) as UserType
    const { email, picture, name } = decoded
    return { email, picture, name }
}

export const logoutHndlr = async ({ email, res }: { email: string; res: Response }) => {
    await findByEmailAndUpdateIfExistOrCreate({
        email,
        objToSet: { accessToken: '', expiryDate: 0, refreshToken: '', picture: '', name: '' }
    })
    clearCookie(res)
}
