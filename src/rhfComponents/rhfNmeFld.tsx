import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'

import { NAME_FIELD } from '@/const/formField'
import RhfTxtFld from '@/rhfComponents/rhfTxtFld'
import { SXOptionalProps } from '@/types/common'

const RhfNmeFld = ({ sx }: SXOptionalProps) => {
    return (
        <RhfTxtFld
            name={NAME_FIELD}
            placeholder={NAME_FIELD}
            slotProps={{
                input: {
                    endAdornment: <InsertEmoticonIcon />
                }
            }}
            sx={sx}
        />
    )
}

export default RhfNmeFld
