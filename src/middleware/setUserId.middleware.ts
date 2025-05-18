import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../auth/utils/token.utils.js'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../types/common.types.js'
import { TOKEN_EXPIRED_ERROR } from '../constants/err.constants.js'

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

        req.userId = payload.id

        return next()
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: TOKEN_EXPIRED_ERROR })
        }
        return next()
    }
}

export { setUserId }
