import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import path from 'path'

const serviceAccPath = path.join(process.cwd(), 'make-green-firestore-firebase-adminsdk-fbsvc-36b86c3281.json')
const serviceAcc = JSON.parse(readFileSync(serviceAccPath, 'utf-8'))

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAcc)
    })
}

export default admin
