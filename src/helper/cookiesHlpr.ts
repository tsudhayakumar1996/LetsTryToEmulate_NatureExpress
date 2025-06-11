import type { CookieOptions, Response } from 'express'

const cookieOption: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
}

// const cookieOption: CookieOptions = {
//   httpOnly: true,
//   secure: true,
//   sameSite: 'None',   // allow cross-site requests (e.g., frontend.example.com -> api.example.com)
// };

export const setCookie = (res: Response, cookieToken: string) => {
    res.cookie('access_token', cookieToken, cookieOption)
}

export const clearCookie = (res: Response) => {
    res.clearCookie('access_token', cookieOption)
}
