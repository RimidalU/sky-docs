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
const generateAccessToken = (userId: number, jti: string): string => {
    return jwt.sign({ id: userId, jti }, getEnv('ACCESS_TOKEN_SECRET'), {
        expiresIn: ACCESS_TOKEN_EXPIRE,
    })
}

const generateRefreshToken = (
    userId: number,
    jti: string
): GenerateRefreshTokenResponse => {
    const expiresIn = REFRESH_TOKEN_EXPIRES_IN_SECONDS
    const expiresAt = new Date(Date.now() + expiresIn * 1000)

    const token = jwt.sign(
        { id: userId, jti },
        getEnv('REFRESH_TOKEN_SECRET'),
        {
            expiresIn,
        }
    )

    return { token, expiresAt }
}

const validateRefreshToken = async (token: string) => {
    try {
        return jwt.verify(token, getEnv('REFRESH_TOKEN_SECRET'))
    } catch (err) {
        return null
    }
}

const verifyAccessToken = (token: string): { id: number; jti: string } => {
    return jwt.verify(token, getEnv('ACCESS_TOKEN_SECRET')) as {
        id: number
        jti: string
    }
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    validateRefreshToken,
}
