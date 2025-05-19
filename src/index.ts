import 'reflect-metadata'

import express, { Request, Response, Router } from 'express'
import cors from 'cors'

import { AppDataSource } from './db /data-source.js'
import logger from './utils/logger.utils.js'
import { getEnv } from './utils/env.utils.js'

import {
    signinRouter,
    logoutRouter,
    infoRouter,
    signupRouter,
} from './auth/routes/index.js'
import { fileRouter } from './file/routes/file.route.js'
import { redisClient } from './utils/redisClient.js'

const PORT = getEnv('PORT', 4000)
const API_VERSION = getEnv('API_VERSION', 1)

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

const router = Router()

router.use('/signin', signinRouter)
router.use('/signup', signupRouter)
router.use('/info', infoRouter)
router.use('/logout', logoutRouter)
router.use('/file', fileRouter)

app.use(`/v${API_VERSION}`, router)

let server: ReturnType<typeof app.listen>

async function startServer() {
    try {
        await AppDataSource.initialize()
        logger.log('Database connected')

        redisClient.on('connect', () => {
            logger.log('Redis connected')
        })
        await redisClient.connect()

        server = app.listen(PORT, () => {
            logger.log(`Server running on port ${PORT}`)
        })
    } catch (err) {
        logger.error('Database connection error:', err)
        process.exit(1)
    }
}

const shutdown = () => {
    logger.log('Shutting down...')

    if (server) {
        server.close(() => {
            logger.log('HTTP server closed')

            AppDataSource.destroy().then(() => {
                logger.log('Database connection closed')

                process.exit(0)
            })
        })

        redisClient.on('end', () => {
            logger.log('Redis connection closed')
        })
        redisClient.disconnect()
    } else {
        process.exit(0)
    }
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

startServer()
