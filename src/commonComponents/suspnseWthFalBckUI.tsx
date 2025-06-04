import { Suspense } from 'react'

import VertCentCircPrgs from '@/commonComponents/vertCentCircPrgs'
import { ChildrenProp } from '@/types/common'

export const SuspnseWthFalBckUI = ({ children }: ChildrenProp) => (
    <Suspense fallback={<VertCentCircPrgs />}>{children}</Suspense>
)
