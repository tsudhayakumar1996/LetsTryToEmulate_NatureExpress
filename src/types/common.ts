import type { Request } from 'express'

export type UserType = {
    email: string
    name: string
    picture: string
    refreshToken: string
    expiryDate: number
    accessToken: string
}

export type OAuthDecodedType = {
    iss: string
    azp: string
    aud: string
    sub: string
    email: string
    email_verified: boolean
    at_hash: string
    name: string
    picture: string
    given_name: string
    iat: number
    exp: number
}

export interface ExprsReqUsrExtntdType extends Request {
    user?: Pick<UserType, 'email'>
}
