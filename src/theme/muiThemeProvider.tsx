import { ThemeProvider } from '@mui/material'

import theme from '@/theme/theme'
import { ChildrenProp } from '@/types/common'

const MuiThemeProvider = ({ children }: ChildrenProp) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MuiThemeProvider
