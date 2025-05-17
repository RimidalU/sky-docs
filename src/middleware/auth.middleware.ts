import { NextFunction, Request, Response } from 'express'
import { FORBIDDEN_ERROR } from '../constants/err.constants.js'

interface AuthRequest extends Request {
    userId?: number
}

const checkAuth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.userId) {
        return res.status(403).json({ message: FORBIDDEN_ERROR })
    }

    return next()
}

export { checkAuth }
