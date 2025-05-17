import jwt from 'jsonwebtoken'

import { getEnv } from '../../utils/env.utils.js'
import {
    ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN_EXPIRE_DAYS,
} from '../constants/token.constants.js'
const generateAccessToken = (userId: string): string => {
    return jwt.sign({ id: userId }, getEnv('ACCESS_TOKEN_SECRET'), {
        expiresIn: Number(getEnv(ACCESS_TOKEN_EXPIRE)),
    })
}

const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ id: userId }, getEnv('REFRESH_TOKEN_SECRET'), {
        expiresIn: REFRESH_TOKEN_EXPIRE_DAYS,
    })
}

export { generateAccessToken, generateRefreshToken }
