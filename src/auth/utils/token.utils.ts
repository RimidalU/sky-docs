import jwt from 'jsonwebtoken'

import { getEnv } from '../../utils/env.utils.js'
import {
    ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN_EXPIRES_IN_SECONDS,
} from '../constants/token.constants.js'

interface GenerateRefreshTokenResponse {
    token: string
    expiresAt: Date
}
const generateAccessToken = (userId: number): string => {
    return jwt.sign({ id: userId }, getEnv('ACCESS_TOKEN_SECRET'), {
        expiresIn: ACCESS_TOKEN_EXPIRE,
    })
}

const generateRefreshToken = (userId: number): GenerateRefreshTokenResponse => {
    const expiresIn = REFRESH_TOKEN_EXPIRES_IN_SECONDS
    const expiresAt = new Date(Date.now() + expiresIn * 1000)

    const token = jwt.sign({ id: userId }, getEnv('ACCESS_TOKEN_SECRET'), {
        expiresIn,
    })

    return { token, expiresAt }
}

export { generateAccessToken, generateRefreshToken }
