import { GRANTED } from '@/const/txt'

export const getNotificationPermHandler = (succCb: () => void, errCb: (permission: NotificationPermission) => void) =>
    Notification.requestPermission()
        .then((permission) => {
            if (permission === GRANTED) {
                succCb()
            } else {
                errCb(permission)
            }
        })
        .catch((_err) => errCb(_err))
