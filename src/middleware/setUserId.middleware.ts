import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../auth/utils/token.utils.js'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../types/common.types.js'
import { TOKEN_EXPIRED_ERROR } from '../constants/err.constants.js'
import { generateFingerprint } from '../utils/auth.utils.js'
import { getRefreshTokenByUserIdAndFingerprint } from '../auth/repositories/refresh-token.repository.js'

const setUserId = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers['authorization']
        if (!authHeader) return next()

        const token = authHeader.split(' ')[1]
        if (!token) return next()

        const payload = verifyAccessToken(token)

        if (!payload) return next()

        const fingerprint = generateFingerprint(req)

        const refreshTokenRecord = await getRefreshTokenByUserIdAndFingerprint(
            payload.id,
            fingerprint
        )
        if (!refreshTokenRecord || refreshTokenRecord.revoked) {
            return res.status(401).json({ message: 'Token revoked or invalid' })
        }

        req.userId = payload.id
        req.fingerprint = fingerprint

        return next()
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: TOKEN_EXPIRED_ERROR })
        }
        return next()
    }
}

export { setUserId }
