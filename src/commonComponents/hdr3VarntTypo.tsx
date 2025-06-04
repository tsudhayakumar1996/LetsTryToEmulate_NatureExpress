import { Typography } from '@mui/material'

import { SXOptionalProps, TypoTilteProp } from '@/types/common'

const Hdr3VarntTypo = ({ text, sx }: SXOptionalProps & TypoTilteProp) => {
    return (
        <Typography
            sx={sx}
            variant="h3"
        >
            {text}
        </Typography>
    )
}

export default Hdr3VarntTypo
