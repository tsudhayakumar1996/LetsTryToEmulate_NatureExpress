import { Router } from 'express'
import { join } from 'path'
import { UNKNOWN_USER } from '../const'
import { globalResFn } from '../helper/globalResFn'

const router = Router()

router.get('/', (_req, res) => {
    const location = 'router - /'
    try {
        res.sendFile(join(__dirname, '../../public/index.html'))
    } catch (err) {
        globalResFn({ res, code: 500, resBody: { user: UNKNOWN_USER, location, error: err } })
    }
})

export default router
