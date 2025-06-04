import { IconButton } from '@mui/material'

import { ChildrenProp } from '@/types/common'

const CmnIcnBtn = ({ children, onClckHndlr }: ChildrenProp & { onClckHndlr: () => void }) => {
    return <IconButton onClick={onClckHndlr}>{children}</IconButton>
}

export default CmnIcnBtn
