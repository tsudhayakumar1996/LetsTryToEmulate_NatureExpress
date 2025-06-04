import { useEffect, useState } from 'react'

import { initializeApp } from 'firebase/app'
import type { Messaging } from 'firebase/messaging'
import { getMessaging } from 'firebase/messaging'

const FcmPvdr = () => {
    // fcm config obj
    const fireBaseConfig = {
        apiKey: import.meta.env.VITE_API_URL,
        authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FCM_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FCM_STO_BUCK,
        messagingSenderId: import.meta.env.VITE_FCM_SENDET_ID,
        appId: import.meta.env.VITE_FCM_APP_ID,
        measurementId: import.meta.env.VITE_FCM_MEASUREMENT_ID
    }

    const app = initializeApp(fireBaseConfig)

    // state
    const [, setmessaging] = useState<Messaging>()

    // effect
    useEffect(() => {
        setmessaging(getMessaging(app))
    }, [app])

    return <></>
}

export default FcmPvdr
