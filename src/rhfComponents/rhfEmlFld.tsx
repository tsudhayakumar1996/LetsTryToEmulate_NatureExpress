import EmailIcon from '@mui/icons-material/Email'

import { EMAIL_FIELD } from '@/const/formField'
import RhfTxtFld from '@/rhfComponents/rhfTxtFld'
import { FormFieldExtDisabledProp, SXOptionalProps } from '@/types/common'

const RhfEmlFld = ({ sx, disabled }: FormFieldExtDisabledProp & SXOptionalProps) => {
    return (
        <RhfTxtFld
            disabled={disabled}
            name={EMAIL_FIELD}
            placeholder={EMAIL_FIELD}
            slotProps={{
                input: {
                    endAdornment: <EmailIcon />
                }
            }}
            sx={sx}
        />
    )
}

export default RhfEmlFld
