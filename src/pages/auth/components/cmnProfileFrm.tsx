import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'

import CmnButton from '@/commonComponents/cmnButton'
import Hdr3VarntTypo from '@/commonComponents/hdr3VarntTypo'
import { COMPLETE_REGISTER_API_END_POINT, PASS_CONFIRM_API_END_POINT } from '@/const/apiEndPnts'
import { SUBMIT } from '@/const/btn'
import { IN_VALID_EMAIL, LENGTH_SHOULD_6, MIN_LENGTH_SHOULD_3, MIN_LENGTH_SHOULD_6, REQUIRED } from '@/const/msg'
import { COMPLETE_REGISTER, JWT_TOKEN, PASS_CONFIRM } from '@/const/txt'
import { HOME_UI_ROUTE } from '@/const/uiRoute'
import { postApi } from '@/fetch'
import { setValInStorage } from '@/helper/localStorageApi'
import RhfCdeFld from '@/rhfComponents/rhfCdeFld'
import RhfEmlFld from '@/rhfComponents/rhfEmlFld'
import RhfFrmPvdr from '@/rhfComponents/rhfFrmPvdr'
import RhfNmeFld from '@/rhfComponents/rhfNmeFld'
import RhfPassFld from '@/rhfComponents/rhfPassFld'
import { AuthFormForProp, UserProp } from '@/types/common'
import { enqueSnackBarError, enqueSnackBarSuccess } from '@/utils/helper'

const CmnProfileFrmSchema = Yup.object().shape({
    email: Yup.string().email(IN_VALID_EMAIL).required(REQUIRED),
    name: Yup.string().min(3, MIN_LENGTH_SHOULD_3).required(REQUIRED),
    code: Yup.string().max(6, LENGTH_SHOULD_6).required(REQUIRED),
    password: Yup.string().min(6, MIN_LENGTH_SHOULD_6).required(REQUIRED)
})

const fldSpceSx = { mb: 4 }
const mb2 = { mb: 2 }

const CmnProfileFrm = ({ email, name, formFor }: AuthFormForProp & UserProp) => {
    // hook
    const navigate = useNavigate()

    // rhf
    const methods = useForm({
        defaultValues: { email, name, code: '', password: '' },
        resolver: yupResolver(CmnProfileFrmSchema)
    })
    const {
        handleSubmit,
        formState: { isSubmitting, isSubmitSuccessful }
    } = methods

    // const
    const dsbleSubmtBtn = isSubmitting || isSubmitSuccessful

    // query
    const mutation = useMutation({
        mutationFn: (formData: Yup.InferType<typeof CmnProfileFrmSchema>) =>
            postApi({ endUrl: getEndUrl(), reqObj: formData }),
        onSuccess: (res) => {
            navigate(HOME_UI_ROUTE, { replace: true })
            setValInStorage(JWT_TOKEN, res.token)
            enqueSnackBarSuccess(res.message)
        },
        onError: (err) => enqueSnackBarError(err)
    })

    // hndlr
    const getEndUrl = (): string => {
        let url = ''
        switch (formFor) {
            case PASS_CONFIRM:
                url = PASS_CONFIRM_API_END_POINT
                break
            case COMPLETE_REGISTER:
                url = COMPLETE_REGISTER_API_END_POINT
                break
            default:
                break
        }
        return url
    }

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
                text={formFor}
            />
            {/* fields */}
            <RhfEmlFld
                disabled
                sx={fldSpceSx}
            />
            <RhfNmeFld sx={fldSpceSx} />
            <RhfCdeFld sx={fldSpceSx} />
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
        </RhfFrmPvdr>
    )
}

export default CmnProfileFrm
