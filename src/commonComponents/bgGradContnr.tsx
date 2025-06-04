import { Box, useTheme } from '@mui/material'

import { ChildrenProp } from '@/types/common'

const BgGradContnr = ({ children }: ChildrenProp) => {
    // hook
    const {
        palette: {
            primary: { dark, light }
        }
    } = useTheme()

    return (
        <Box
            sx={{
                backgroundImage: `linear-gradient(${dark}, ${light})`,
                height: '100vh',
                overflowY: 'scroll'
            }}
        >
            {children}
        </Box>
    )
}

export default BgGradContnr
