import { BLACKLIST_EXPIRES_IN_SECONDS } from '../constants/token.constants.js'
import { redisClient } from './redisClient.js'

const addToBlacklist = async (
    jti: string,
    expiresIn: number = BLACKLIST_EXPIRES_IN_SECONDS
) => {
    await redisClient.set(`blacklist:${jti}`, '1', { EX: expiresIn })
}

const isTokenRevoked = async (jti: string): Promise<boolean> => {
    const exists = await redisClient.exists(`blacklist:${jti}`)
    return exists === 1
}

export { addToBlacklist, isTokenRevoked }
