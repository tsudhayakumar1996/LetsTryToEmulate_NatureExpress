import { Box } from '@mui/material'
import { Outlet } from 'react-router'

import TxtAlgnCenterContnr from '@/commonComponents/txtAlgnCenterContnr'
import VertCentContnr from '@/commonComponents/vertCentContnr'
import WhteBgWthPosndImgContnr from '@/commonComponents/whteBgWthPosndImgContnr'

const AthFrmsContnr = () => {
    return (
        <VertCentContnr>
            <Box sx={{ width: { xs: '100%', sm: '400px' }, m: 2 }}>
                <WhteBgWthPosndImgContnr>
                    <TxtAlgnCenterContnr>
                        <Outlet />
                    </TxtAlgnCenterContnr>
                </WhteBgWthPosndImgContnr>
            </Box>
        </VertCentContnr>
    )
}

export default AthFrmsContnr
