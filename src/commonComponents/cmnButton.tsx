import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'
import { motion } from 'motion/react'

const CmnButton = ({ ...props }: ButtonProps) => {
    return (
        <Button
            component={motion.button}
            {...props}
            sx={{ textTransform: 'capitalize', ...props.sx }}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
        >
            {props.title}
        </Button>
    )
}

export default CmnButton
