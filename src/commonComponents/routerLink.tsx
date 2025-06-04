import { Box } from '@mui/material'
import { Link } from 'react-router'

import { SXOptionalProps, ToProp, TypoTilteProp } from '@/types/common'

export const RouterLink = ({ text, to, sx }: SXOptionalProps & ToProp & TypoTilteProp) => {
    return (
        <Box
            component={Link}
            sx={{ ...sx, color: (theme) => theme.palette.primary.dark }}
            to={to}
        >
            {text}
        </Box>
    )
}
