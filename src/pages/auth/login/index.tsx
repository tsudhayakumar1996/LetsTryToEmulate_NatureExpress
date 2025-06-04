import AnimatePageLayout from '@/animatePageLayout'
import { GET_ME_API_END_POINT, GOOGLE_AUTH_LOGIN } from '@/const/apiEndPnts'
import { getApi, postApi } from '@/fetch'
import { Button } from '@mui/material'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

const Login = () => {
    // query
    const { mutateAsync } = useMutation({
        mutationFn: (code: string) => postApi({ endUrl: GOOGLE_AUTH_LOGIN, reqObj: { code } }),
        onSuccess: () => alert('success'),
        onError: () => alert('An error occured...')
    })

    // hook
    const navigate = useNavigate()

    // handler
    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: (token) => {
            mutateAsync(token.code)
            navigate('/')
        }
    })
    return (
        <AnimatePageLayout>
            <Button
                variant="outlined"
                onClick={() => googleLogin()}
            >
                Login
            </Button>
            <Button
                variant="outlined"
                onClick={googleLogout}
            >
                Logout
            </Button>
            <Button
                variant="outlined"
                onClick={async () => {
                    await getApi({ endUrl: GET_ME_API_END_POINT })
                }}
            >
                api check
            </Button>
        </AnimatePageLayout>
    )
}

export default Login
