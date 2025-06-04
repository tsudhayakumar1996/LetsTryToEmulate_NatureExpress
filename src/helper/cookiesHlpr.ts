import type { CookieOptions, Response } from 'express'

const cookieOption: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
    // maxAge: 60 * 60 * 1000
}

export const setCookie = (res: Response, cookieToken: string) => {
    res.cookie('access_token', cookieToken, cookieOption)
}

export const clearCookie = (res: Response) => {
    res.clearCookie('access_token', cookieOption)
}
