import { Box } from '@mui/material'

import { ChildrenProp } from '@/types/common'

const WhteBgWthPosndImgContnr = ({ children }: ChildrenProp) => {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                // backgroundImage: 'url(/img/paper-blur.png)',
                // backgroundSize: 300,
                // backgroundRepeat: 'no-repeat',
                borderRadius: 4,
                boxShadow: '20px 25px 40px #ccc',
                p: 4
            }}
        >
            {children}
        </Box>
    )
}

export default WhteBgWthPosndImgContnr
