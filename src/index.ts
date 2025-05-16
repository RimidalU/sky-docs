import express, { Request, Response } from 'express'
import cors from 'cors'

import { AppDataSource } from './db /data-source.js'
import logger from './utils/logger.utils.js'
import { getEnv } from './utils/env.utils.js'

const PORT = getEnv('PORT', 4000)

const app = express()
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

let server: ReturnType<typeof app.listen>

async function startServer() {
    try {
        await AppDataSource.initialize()
        logger.log('Database connected')

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
    } else {
        process.exit(0)
    }
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

startServer()
