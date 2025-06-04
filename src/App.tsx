import { lazy } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from 'react-router'

import '@/index.css'
import router from '@/router'

const MuiThemeProvider = lazy(() => import('@/theme/muiThemeProvider'))
const SnkBrPvdr = lazy(() => import('@/snkBrPvdr'))
const QryClntPvdr = lazy(() => import('@/qryClntPvdr'))
// const FcmPvdr = lazy(() => import("@/fcmPvdr"));

function App() {
    return (
        <MuiThemeProvider>
            <QryClntPvdr>
                <SnkBrPvdr />
                {/* <FcmPvdr /> */}
                <GoogleOAuthProvider
                    onScriptLoadError={() =>
                        // eslint-disable-next-line no-console
                        console.log('Loading error occured...')
                    }
                    clientId="296348523864-sb58acbobvjp2u76tdaeu5r3jjn4da57.apps.googleusercontent.com"
                >
                    <RouterProvider router={router} />
                </GoogleOAuthProvider>
            </QryClntPvdr>
        </MuiThemeProvider>
    )
}

export default App
