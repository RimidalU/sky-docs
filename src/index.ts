import express, { Request, Response } from 'express'
import { AppDataSource } from './db /data-source.js'
import logger from './utils/logger.utils.js'

const app = express()
const port = process.env.PORT || 4000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

let server: ReturnType<typeof app.listen>

async function startServer() {
    try {
        await AppDataSource.initialize()
        logger.log('Database connected')

        server = app.listen(port, () => {
            logger.log(`Server running on port ${port}`)
        })
    } catch (err) {
        logger.error('Database connection error:', err)
        process.exit(1)
    }
}

startServer()
