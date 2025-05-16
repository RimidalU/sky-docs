import { Response, Request, NextFunction } from 'express'
import { signinService } from '../services/auth.service.js'
import logger from '../../utils/logger.utils.js'

export type SigninPayload = {
    id: string
    password: string
}
const signinController = async (req: Request, res: any) => {
    try {
        const { id, password } = req.body as SigninPayload

        if (!id || !password) {
            return res.status(400).json({ error: 'id and password required' })
        }

        const tokens = await signinService({ id, password })

        return res.json(tokens)
    } catch (err: any) {
        logger.error('Signin Controller error:', err)
        if (err.message === 'Invalid credentials') {
            return res.status(401).json({ error: err.message })
        }
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const refreshTokenController = async (req: Request, res: Response) => {
    return res.status(501).json({ error: 'Not implemented' })
}

const signupController = async (req: Request, res: Response) => {
    return res.status(501).json({ error: 'Not implemented' })
}

const infoController = async (req: Request, res: Response) => {
    return res.status(501).json({ error: 'Not implemented' })
}

const logoutController = async (req: Request, res: Response) => {
    return res.status(501).json({ error: 'Not implemented' })
}

export {
    signinController,
    refreshTokenController,
    signupController,
    infoController,
    logoutController,
}
