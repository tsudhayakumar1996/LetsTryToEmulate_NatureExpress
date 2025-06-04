import admin from './fcm'

export const fcmForSingleTok = async ({ title, body, token }: { title: string; body: string; token: string }) => {
    try {
        const message = {
            data: {
                title,
                body
            },
            token
        }

        const res = await admin.messaging().send(message)
        return res
    } catch (err) {
        throw new Error(String(err))
    }
}

export const fcmForMultiTok = async ({ title, body, tokens }: { title: string; body: string; tokens: string[] }) => {
    try {
        const message = {
            data: {
                title,
                body
            },
            tokens
        }

        const res = await admin.messaging().sendEachForMulticast(message)
        return res
    } catch (err) {
        throw new Error(String(err))
    }
}
