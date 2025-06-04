import { enqueueSnackbar } from 'notistack'

export const resolvePromiseWithDelay = (promise: Promise<any>, dlyTme: number = 1000) =>
    new Promise((resolve) => setTimeout(resolve, dlyTme)).then(() => promise)

export const enqueSnackBarError = (err: Error) => enqueueSnackbar(JSON.parse(err.message).message, { variant: 'error' })
export const enqueSnackBarSuccess = (msg: string) => enqueueSnackbar(msg, { variant: 'success' })
export const enqueSnackBarInfo = (err: Error) => enqueueSnackbar(JSON.parse(err.message).message, { variant: 'info' })
export const enqueSnackBarWarning = (err: Error) =>
    enqueueSnackbar(JSON.parse(err.message).message, { variant: 'warning' })
