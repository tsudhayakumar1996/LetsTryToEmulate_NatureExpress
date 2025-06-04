import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Divider } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'

import CmnButton from '@/commonComponents/cmnButton'
import Hdr3VarntTypo from '@/commonComponents/hdr3VarntTypo'
import { RouterLink } from '@/commonComponents/routerLink'
import { REGISTER_API_END_POINT } from '@/const/apiEndPnts'
import { IN_VALID_EMAIL, REQUIRED } from '@/const/msg'
import { LOGIN, REGISTER } from '@/const/txt'
import { COMPLETE_REGISTER_UI_ROUTE, LOGIN_UI_ROUTE } from '@/const/uiRoute'
import { postApi } from '@/fetch'
import RhfEmlFld from '@/rhfComponents/rhfEmlFld'
import RhfFrmPvdr from '@/rhfComponents/rhfFrmPvdr'
import { enqueSnackBarError } from '@/utils/helper'

const RgrFrmSchema = Yup.object().shape({
    email: Yup.string().email(IN_VALID_EMAIL).required(REQUIRED)
})

const fldSpceSx = { mb: 4 }
const lindAlignEndSx = { display: 'block', textAlign: 'end' }
const mb2 = { mb: 2 }
const my2 = { my: 2 }

const RgrForm = () => {
    // rhf
    const methods = useForm({
        defaultValues: { email: '' },
        resolver: yupResolver(RgrFrmSchema)
    })
    const {
        handleSubmit,
        getValues,
        formState: { isSubmitting }
    } = methods

    // hook
    const navigate = useNavigate()

    // query
    const mutation = useMutation({
        mutationFn: (formData: Yup.InferType<typeof RgrFrmSchema>) =>
            postApi({ endUrl: REGISTER_API_END_POINT, reqObj: formData }),
        onSuccess: () =>
            navigate(COMPLETE_REGISTER_UI_ROUTE, {
                replace: true,
                state: { email: getValues('email'), name: '' }
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
                text={REGISTER}
            />
            {/* fields */}
            <RhfEmlFld sx={fldSpceSx} />
            {/* btn */}
            <Box>
                <CmnButton
                    disabled={isSubmitting}
                    sx={mb2}
                    title={REGISTER}
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

export default RgrForm
