import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'node:http'
import { join } from 'node:path'
import authRoute from './routes/authRoute'
import homeRoute from './routes/homeRoute'

dotenv.config()

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true
}

const PORT = process.env.PORT
const app = express()
const server = createServer(app)

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))

// routes
app.use('/', homeRoute)
app.use('/auth', authRoute)

app.all(/.*/, (_req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'))
})

// server
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server running on port:${PORT}`)
})

// npx eslint --fix /Users/udhay/Documents/LetsTryToEmulateNature/LetsTryToEmulate_NatureExpress/src/index.ts
