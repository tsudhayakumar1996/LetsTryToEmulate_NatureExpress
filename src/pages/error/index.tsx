import Hdr3VarntTypo from '@/commonComponents/hdr3VarntTypo'
import VertCentContnr from '@/commonComponents/vertCentContnr'
import { AN_ERROR_OCCURED } from '@/const/msg'

const Error = () => {
    return (
        <VertCentContnr>
            <Hdr3VarntTypo text={AN_ERROR_OCCURED} />
        </VertCentContnr>
    )
}

export default Error
