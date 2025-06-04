import { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router'

import { PASS_CONFIRM } from '@/const/txt'
import { LOGIN_UI_ROUTE } from '@/const/uiRoute'
import CmnProfileFrm from '@/pages/auth/components/cmnProfileFrm'

const PassConfrmFrm = () => {
    // hook
    const { state } = useLocation()
    const navigate = useNavigate()

    // const
    const email = state?.email
    const name = state?.name

    // effect
    useEffect(() => {
        if (!email) navigate(LOGIN_UI_ROUTE)
    }, [email, navigate])

    return (
        <CmnProfileFrm
            email={email}
            formFor={PASS_CONFIRM}
            name={name}
        />
    )
}

export default PassConfrmFrm
