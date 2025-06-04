import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Divider } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'

import CmnButton from '@/commonComponents/cmnButton'
import Hdr3VarntTypo from '@/commonComponents/hdr3VarntTypo'
import { RouterLink } from '@/commonComponents/routerLink'
import { FORGOT_PASS_API_END_POINT } from '@/const/apiEndPnts'
import { SUBMIT } from '@/const/btn'
import { IN_VALID_EMAIL, REQUIRED } from '@/const/msg'
import { FORGOT_PASS, LOGIN } from '@/const/txt'
import { LOGIN_UI_ROUTE, PASS_CONFIRM_UI_ROUTE } from '@/const/uiRoute'
import { postApi } from '@/fetch'
import RhfEmlFld from '@/rhfComponents/rhfEmlFld'
import RhfFrmPvdr from '@/rhfComponents/rhfFrmPvdr'
import { enqueSnackBarError } from '@/utils/helper'

const PassRstFromSchema = Yup.object().shape({
    email: Yup.string().email(IN_VALID_EMAIL).required(REQUIRED)
})

const fldSpceSx = { mb: 4 }
const lindAlignEndSx = { display: 'block', textAlign: 'end' }
const mb2 = { mb: 2 }
const my2 = { my: 2 }

const PassRstFrm = () => {
    // rhf
    const methods = useForm({
        defaultValues: { email: '' },
        resolver: yupResolver(PassRstFromSchema)
    })
    const {
        handleSubmit,
        formState: { isSubmitting },
        getValues
    } = methods

    // hook
    const navigate = useNavigate()

    // query
    const mutation = useMutation({
        mutationFn: (formData: Yup.InferType<typeof PassRstFromSchema>) =>
            postApi({ endUrl: FORGOT_PASS_API_END_POINT, reqObj: formData }),
        onSuccess: (res) =>
            navigate(PASS_CONFIRM_UI_ROUTE, {
                replace: true,
                state: { email: getValues('email'), name: res.name }
            }),
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
                text={FORGOT_PASS}
            />
            {/* fields */}
            <RhfEmlFld sx={fldSpceSx} />
            {/* btn */}
            <Box>
                <CmnButton
                    disabled={isSubmitting}
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
                    text={'⬅️' + LOGIN}
                    to={LOGIN_UI_ROUTE}
                />
            </Box>
        </RhfFrmPvdr>
    )
}

export default PassRstFrm
