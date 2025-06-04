import { Typography } from '@mui/material'

import { SXOptionalProps, TypoTilteProp } from '@/types/common'

const Hdr1VarntTypo = ({ text, sx }: SXOptionalProps & TypoTilteProp) => {
    return (
        <Typography
            sx={sx}
            variant="h1"
        >
            {text}
        </Typography>
    )
}

export default Hdr1VarntTypo
