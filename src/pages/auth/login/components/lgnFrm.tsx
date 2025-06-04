import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Divider } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'

import CmnButton from '@/commonComponents/cmnButton'
import Hdr3VarntTypo from '@/commonComponents/hdr3VarntTypo'
import { RouterLink } from '@/commonComponents/routerLink'
import { LOGIN_API_END_POINT } from '@/const/apiEndPnts'
import { SUBMIT } from '@/const/btn'
import { IN_VALID_EMAIL, MIN_LENGTH_SHOULD_3, REQUIRED } from '@/const/msg'
import { FORGOT_PASS as FORGOT_PASS_TEXT, JWT_TOKEN, LOGIN, REGISTER as REGISTER_TEXT } from '@/const/txt'
import { FORGOT_PASS_UI_ROUTE, HOME_UI_ROUTE, REGISTER_UI_ROUTE } from '@/const/uiRoute'
import { postApi } from '@/fetch'
import { setValInStorage } from '@/helper/localStorageApi'
import RhfEmlFld from '@/rhfComponents/rhfEmlFld'
import RhfFrmPvdr from '@/rhfComponents/rhfFrmPvdr'
import RhfPassFld from '@/rhfComponents/rhfPassFld'
import { enqueSnackBarError, enqueSnackBarSuccess } from '@/utils/helper'

const LgnFrmSchema = Yup.object().shape({
    email: Yup.string().email(IN_VALID_EMAIL).required(REQUIRED),
    password: Yup.string().min(3, MIN_LENGTH_SHOULD_3).required(REQUIRED)
})

const fldSpceSx = { mb: 4 }
const lindAlignEndSx = { display: 'block', textAlign: 'end' }
const mb2 = { mb: 2 }
const my2 = { my: 2 }

const LgnFrm = () => {
    // rhf
    const methods = useForm({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(LgnFrmSchema)
    })
    const {
        handleSubmit,
        formState: { isSubmitting, isSubmitSuccessful }
    } = methods

    // const
    const dsbleSubmtBtn = isSubmitting || isSubmitSuccessful

    // hook
    const navigate = useNavigate()

    // query
    const mutation = useMutation({
        mutationFn: (formData: Yup.InferType<typeof LgnFrmSchema>) =>
            postApi({ endUrl: LOGIN_API_END_POINT, reqObj: formData }),
        onSuccess: (res) => {
            navigate(HOME_UI_ROUTE, { replace: true })
            setValInStorage(JWT_TOKEN, res.token)
            enqueSnackBarSuccess(res.message)
        },
        onError: (err) => enqueSnackBarError(err)
    })

    // hndlr
    const onSubmit = handleSubmit((formData) => {
        mutation.mutateAsync(formData)
    })

    return (
        <RhfFrmPvdr
            methods={methods}
            onSubmit={onSubmit}
        >
            {/* form */}
            <Hdr3VarntTypo
                sx={mb2}
                text={LOGIN}
            />
            {/* fields */}
            <RhfEmlFld sx={fldSpceSx} />
            <RhfPassFld sx={fldSpceSx} />
            {/* btn */}
            <Box>
                <CmnButton
                    disabled={dsbleSubmtBtn}
                    sx={mb2}
                    title={SUBMIT}
                    type="submit"
                    variant="outlined"
                />
            </Box>
            <Divider />
            {/* links */}
            <Box sx={my2}>
                <RouterLink
                    sx={{ ...lindAlignEndSx, ...my2 }}
                    text={REGISTER_TEXT + '➡️'}
                    to={HOME_UI_ROUTE}
                />
                <RouterLink
                    sx={{ ...lindAlignEndSx, ...my2 }}
                    text={REGISTER_TEXT + '➡️'}
                    to={REGISTER_UI_ROUTE}
                />
                <RouterLink
                    sx={lindAlignEndSx}
                    text={FORGOT_PASS_TEXT + '➡️'}
                    to={FORGOT_PASS_UI_ROUTE}
                />
            </Box>
        </RhfFrmPvdr>
    )
}

export default LgnFrm
