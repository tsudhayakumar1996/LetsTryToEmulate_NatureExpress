import { useState } from 'react'

import KeyIcon from '@mui/icons-material/Key'
import KeyOffIcon from '@mui/icons-material/KeyOff'

import CmnIcnBtn from '@/commonComponents/cmnIcnBtn'
import { PASS_FIELD } from '@/const/formField'
import RhfTxtFld from '@/rhfComponents/rhfTxtFld'
import { SXOptionalProps } from '@/types/common'

const cmnClrSx = { color: '#000' }

const RhfPassFld = ({ sx }: SXOptionalProps) => {
    // state
    const [showPass, setshowPass] = useState(false)

    return (
        <RhfTxtFld
            name={PASS_FIELD}
            placeholder={PASS_FIELD}
            slotProps={{
                input: {
                    endAdornment: (
                        <CmnIcnBtn onClckHndlr={() => setshowPass((prev) => !prev)}>
                            {showPass ? <KeyIcon sx={cmnClrSx} /> : <KeyOffIcon sx={cmnClrSx} />}
                        </CmnIcnBtn>
                    )
                }
            }}
            sx={sx}
            type={showPass ? 'text' : 'password'}
        />
    )
}

export default RhfPassFld
