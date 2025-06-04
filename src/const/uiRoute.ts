export const HOME_UI_ROUTE = '/'
export const AUTH_UI_ROUTE = 'auth'
export const LOGIN_UI_ROUTE = '/' + AUTH_UI_ROUTE + '/' + 'login'
export const REGISTER_UI_ROUTE = '/' + AUTH_UI_ROUTE + '/' + 'register'
export const FORGOT_PASS_UI_ROUTE = '/' + AUTH_UI_ROUTE + '/' + 'forgotPassword'
export const COMPLETE_REGISTER_UI_ROUTE = '/' + AUTH_UI_ROUTE + '/' + 'completeRegister'
export const PASS_CONFIRM_UI_ROUTE = '/' + AUTH_UI_ROUTE + '/' + 'passwordConfirm'

export const AUTH_UI_ROUTES = [
    LOGIN_UI_ROUTE,
    REGISTER_UI_ROUTE,
    FORGOT_PASS_UI_ROUTE,
    COMPLETE_REGISTER_UI_ROUTE,
    PASS_CONFIRM_UI_ROUTE
]
