import { NextFunction, Request, Response } from 'express'
import { FORBIDDEN_ERROR } from '../constants/err.constants.js'
import { AuthRequest } from '../types/common.types.js'

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
