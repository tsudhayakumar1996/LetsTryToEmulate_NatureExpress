import { Box } from '@mui/material'

import { ChildrenProp } from '@/types/common'

const VertCentContnr = ({ children }: ChildrenProp) => {
    return (
        <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="center"
        >
            {children}
        </Box>
    )
}

export default VertCentContnr
