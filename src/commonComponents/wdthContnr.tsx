import { Container } from '@mui/material'

import { ChildrenProp } from '@/types/common'

const WdthContnr = ({ children }: ChildrenProp) => {
    return <Container sx={{ p: '0px !important', height: '100dvh' }}>{children}</Container>
}

export default WdthContnr
