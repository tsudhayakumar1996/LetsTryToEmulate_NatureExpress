import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'

export type RhfTxtFldProps = TextFieldProps & {
    name: string
}

export default function RhfTxtFld({ name, helperText, type, ...other }: RhfTxtFldProps) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    type={type}
                    {...other}
                />
            )}
        />
    )
}
