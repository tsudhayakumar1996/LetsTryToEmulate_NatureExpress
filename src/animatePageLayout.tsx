import { ChildrenProp } from '@/types/common'
import { Box } from '@mui/material'
import { motion } from 'motion/react'

const AnimatePageLayout = ({ children }: ChildrenProp) => {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {children}
        </Box>
    )
}

export default AnimatePageLayout
