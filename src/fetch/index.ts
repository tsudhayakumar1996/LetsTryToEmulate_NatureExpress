import { GET, POST } from '@/const/apiEndPnts'
import { JWT_TOKEN } from '@/const/txt'
import { getValFromStorage } from '@/helper/localStorageApi'
import { APIReqProp, EndUrlProp } from '@/types/common'

const baseUrl = import.meta.env.VITE_API_URL

const resSuccessHandler = async (res: Response) => {
    const resJson = await res.json()
    if (res.ok) return resJson
    else throw new Error(resJson.message)
}

const resErrorHandler = (err: unknown) => {
    let message = 'An unknown error occurred'
    if (err instanceof Error) {
        message = err.message
    }
    return new Error(JSON.stringify({ message }))
}

const structHeaderObj = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getValFromStorage(JWT_TOKEN) ?? ''}`
})

export const getApi = async ({ endUrl }: EndUrlProp) => {
    try {
        const res = await fetch(`${baseUrl}${endUrl}`, {
            method: GET,
            headers: structHeaderObj(),
            credentials: 'include'
        })
        return await resSuccessHandler(res)
    } catch (err) {
        throw resErrorHandler(err)
    }
}

export const postApi = async ({ endUrl, reqObj }: APIReqProp & EndUrlProp) => {
    try {
        const res = await fetch(`${baseUrl}${endUrl}`, {
            method: POST,
            headers: structHeaderObj(),
            body: JSON.stringify(reqObj),
            credentials: 'include'
        })
        return await resSuccessHandler(res)
    } catch (err) {
        throw resErrorHandler(err)
    }
}
