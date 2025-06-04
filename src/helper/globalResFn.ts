import type { Response } from 'express'
import { AN_ERROR_OCCURED } from '../const'
import { logger } from './logger'

type ResBodyType = {
    user: string
    location: string
    [key: string]: any
}

type Props = {
    res: Response
    resBody: ResBodyType
    code: number
}

export const globalResFn = ({ res, resBody, code }: Props) => {
    const isResForErr = 'error' in resBody
    // logger
    if (isResForErr)
        handleError(resBody) // error res
    else logger.info(JSON.stringify(resBody)) // success res

    // delete location key
    delete (resBody as any).location

    // response
    return res.status(code).json(isResForErr ? { message: resBody?.error?.message ?? AN_ERROR_OCCURED } : resBody)
}

const handleError = (resBody: Record<string, any>) => {
    const { error, location } = resBody
    if (error instanceof Error) {
        logger.error({
            message: error.message,
            stack: error.stack,
            name: error.name,
            location
        })
    } else {
        logger.error({
            error,
            location
        })
    }
}
