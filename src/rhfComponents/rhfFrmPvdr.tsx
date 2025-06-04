import type { UseFormReturn } from 'react-hook-form'
import { FormProvider as Form } from 'react-hook-form'

import { ChildrenProp } from '@/types/common'

type Props = ChildrenProp & {
    methods: UseFormReturn<any>
    onSubmit?: VoidFunction
}

export default function RhfFrmPvdr({ children, onSubmit, methods }: Props) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    )
}
