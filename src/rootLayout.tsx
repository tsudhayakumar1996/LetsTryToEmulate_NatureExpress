import { Outlet } from 'react-router'

import AuthGuard from '@/authGuard'
import { SuspnseWthFalBckUI } from '@/commonComponents/suspnseWthFalBckUI'

function RootLayout() {
    return (
        <AuthGuard>
            <SuspnseWthFalBckUI>
                <Outlet />
            </SuspnseWthFalBckUI>
        </AuthGuard>
    )
}

export default RootLayout
