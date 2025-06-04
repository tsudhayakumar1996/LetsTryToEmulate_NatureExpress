import { Box } from '@mui/material'

import { ChildrenProp } from '@/types/common'

const TxtAlgnCenterContnr = ({ children }: ChildrenProp) => {
    return <Box textAlign="center">{children}</Box>
}

export default TxtAlgnCenterContnr
