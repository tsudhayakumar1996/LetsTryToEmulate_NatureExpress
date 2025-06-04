import { useEffect } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'

import { GET_ME_API_END_POINT } from '@/const/apiEndPnts'
import { UN_AUTHORIZED } from '@/const/msg'
import { JWT_TOKEN } from '@/const/txt'
import { AUTH_UI_ROUTES, HOME_UI_ROUTE, LOGIN_UI_ROUTE } from '@/const/uiRoute'
import { getApi } from '@/fetch'
import { getValFromStorage, removeAllValFromStorage } from '@/helper/localStorageApi'
import { ChildrenProp } from '@/types/common'
import { enqueSnackBarError } from '@/utils/helper'

const AuthGuard = ({ children }: ChildrenProp) => {
    // queryclient
    const queryClient = useQueryClient()

    // hook
    const navigate = useNavigate()
    const { pathname } = useLocation()

    // const
    const jwtTkn = getValFromStorage(JWT_TOKEN)
    const isUserInLandPage = pathname === '/'

    // query
    const { mutate } = useMutation({
        mutationFn: () => getApi({ endUrl: GET_ME_API_END_POINT }),
        onSuccess: (res) => {
            queryClient.setQueryData(['me'], () => res)
        },
        onError: (err) => {
            if (JSON.parse(err.message).message === UN_AUTHORIZED) {
                removeAllValFromStorage()
                navigate(LOGIN_UI_ROUTE, { replace: true })
            }
            enqueSnackBarError(err)
        }
    })

    const checkForMe = !AUTH_UI_ROUTES.includes(pathname) && jwtTkn
    const usrInAthPgeAftrLgn = AUTH_UI_ROUTES.includes(pathname) && jwtTkn

    // effect
    useEffect(() => {
        if (isUserInLandPage) return
        if (!jwtTkn) navigate(LOGIN_UI_ROUTE, { replace: true })
        if (usrInAthPgeAftrLgn) navigate(HOME_UI_ROUTE, { replace: true })
        if (checkForMe) {
            mutate()
        }
    }, [jwtTkn, navigate, mutate, checkForMe, usrInAthPgeAftrLgn, isUserInLandPage])

    return <>{children}</>
}

export default AuthGuard
