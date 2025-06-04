import PasswordIcon from '@mui/icons-material/Password'
import { Alert } from '@mui/material'

import { CODE_FIELD } from '@/const/formField'
import { OTP_HAS_BEEN_SENT } from '@/const/msg'
import RhfTxtFld from '@/rhfComponents/rhfTxtFld'
import { SXOptionalProps } from '@/types/common'

const RhfCdeFld = ({ sx }: SXOptionalProps) => {
    return (
        <>
            <Alert
                sx={{
                    py: 0,
                    mb: 1,
                    alignItems: 'center',
                    borderRadius: 4,
                    '& .MuiAlert-message, .MuiAlert-icon': { py: 1 }
                }}
            >
                {OTP_HAS_BEEN_SENT}
            </Alert>
            <RhfTxtFld
                name={CODE_FIELD}
                placeholder={CODE_FIELD}
                slotProps={{
                    input: {
                        endAdornment: <PasswordIcon />
                    }
                }}
                sx={sx}
            />
        </>
    )
}

export default RhfCdeFld
