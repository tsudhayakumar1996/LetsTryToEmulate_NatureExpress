import { ReactNode } from 'react'

import type { SxProps } from '@mui/material'

import { COMPLETE_REGISTER, PASS_CONFIRM } from '@/const/txt'

export type ChildrenProp = { children: ReactNode }
export type UserProp = { email: string; name: string }
export type TypoTilteProp = { text: string }
export type SXProps = { sx: SxProps }
export type SXOptionalProps = { sx?: SxProps }
export type EndUrlProp = { endUrl: string }
export type APIReqProp = { reqObj: Record<string, any> }
export type ToProp = { to: string }
export type AuthFormForProp = { formFor: typeof COMPLETE_REGISTER | typeof PASS_CONFIRM }
export type FormFieldExtDisabledProp = { disabled?: boolean }
