import { styled } from '@mui/material'
import { MaterialDesignContent, SnackbarProvider } from 'notistack'

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
    '&.notistack-MuiContent-success': {
        backgroundColor: theme.palette.success.main
    },
    '&.notistack-MuiContent-error': {
        backgroundColor: theme.palette.error.main
    },
    '&.notistack-MuiContent-info': {
        backgroundColor: theme.palette.info.main
    },
    '&.notistack-MuiContent-warning': {
        backgroundColor: theme.palette.warning.main
    }
}))

const SnkBrPvdr = () => {
    return (
        <SnackbarProvider
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            autoHideDuration={2000}
            Components={{
                success: StyledMaterialDesignContent,
                error: StyledMaterialDesignContent,
                info: StyledMaterialDesignContent,
                warning: StyledMaterialDesignContent
            }}
            iconVariant={{
                success: '✅',
                error: '😵',
                warning: '⚠️',
                info: '💡'
            }}
            maxSnack={3}
        />
    )
}

export default SnkBrPvdr
