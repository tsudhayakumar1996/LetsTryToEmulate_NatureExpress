import { lazy } from 'react'

import { createBrowserRouter } from 'react-router'

import {
    AUTH_UI_ROUTE,
    COMPLETE_REGISTER_UI_ROUTE,
    FORGOT_PASS_UI_ROUTE,
    HOME_UI_ROUTE,
    LOGIN_UI_ROUTE,
    PASS_CONFIRM_UI_ROUTE,
    REGISTER_UI_ROUTE
} from '@/const/uiRoute'
import Error from '@/pages/error'
import NotFound from '@/pages/notFound'
import { resolvePromiseWithDelay } from '@/utils/helper'

const Home = lazy(() => resolvePromiseWithDelay(import('@/pages/home'), 1000))
const Login = lazy(() => resolvePromiseWithDelay(import('@/pages/auth/login'), 1000))
const Register = lazy(() => resolvePromiseWithDelay(import('@/pages/auth/register'), 1000))
const ForgotPass = lazy(() => resolvePromiseWithDelay(import('@/pages/auth/passReset'), 1000))
const ComplReg = lazy(() => resolvePromiseWithDelay(import('@/pages/auth/completeRegister'), 1000))
const PassConfrm = lazy(() => resolvePromiseWithDelay(import('@/pages/auth/passConfrm'), 1000))
const RootLayout = lazy(() => import('@/rootLayout'))
const AthFrmsContnr = lazy(() => import('@/pages/auth/components/athFrmsContnr'))

const router = createBrowserRouter([
    {
        path: HOME_UI_ROUTE,
        Component: RootLayout,
        errorElement: <Error />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: AUTH_UI_ROUTE,
                Component: AthFrmsContnr,
                children: [
                    {
                        path: REGISTER_UI_ROUTE,
                        Component: Register
                    },
                    {
                        path: COMPLETE_REGISTER_UI_ROUTE,
                        Component: ComplReg
                    },
                    {
                        path: LOGIN_UI_ROUTE,
                        Component: Login
                    },
                    {
                        path: FORGOT_PASS_UI_ROUTE,
                        Component: ForgotPass
                    },
                    {
                        path: PASS_CONFIRM_UI_ROUTE,
                        Component: PassConfrm
                    }
                ]
            },
            {
                path: '*',
                Component: NotFound
            }
        ]
    }
])

export default router
