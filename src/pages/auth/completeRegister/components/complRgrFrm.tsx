import { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router'

import { COMPLETE_REGISTER } from '@/const/txt'
import { LOGIN_UI_ROUTE } from '@/const/uiRoute'
import CmnProfileFrm from '@/pages/auth/components/cmnProfileFrm'

const ComplRgrFrm = () => {
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
            formFor={COMPLETE_REGISTER}
            name={name}
        />
    )
}

export default ComplRgrFrm
