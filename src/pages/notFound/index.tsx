import Hdr3VarntTypo from '@/commonComponents/hdr3VarntTypo'
import VertCentContnr from '@/commonComponents/vertCentContnr'
import { PAGE_NOT_FOUND } from '@/const/msg'

const NotFound = () => {
    return (
        <VertCentContnr>
            <Hdr3VarntTypo text={PAGE_NOT_FOUND} />
        </VertCentContnr>
    )
}

export default NotFound
