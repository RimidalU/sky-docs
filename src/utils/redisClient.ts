import { createClient } from 'redis'
import { REDIS_CLIENT_ERROR } from '../constants/err.constants.js'
import { getEnv } from './env.utils.js'

const redisClient = createClient({
    url: getEnv('REDIS_URL', 'redis://localhost:6379'),
})

redisClient.on('error', (err) => console.error(REDIS_CLIENT_ERROR, err))

export { redisClient }
