import { Response } from 'express'
import logger from '../../utils/logger.utils.js'
import {
    MISSING_ID_OR_PASSWORD,
    USER_EXISTS,
} from '../constants/err.constants.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import { signupService } from '../services/signup.service.js'
import { AuthRequest } from '../../types/common.types.js'

interface SignupRequest extends AuthRequest {
    body: {
        id: string
        password: string
    }
}

const signupController = async (req: SignupRequest, res: Response) => {
    try {
        const { id, password } = req.body

        if (!id || !password) {
            return res.status(400).json({ error: MISSING_ID_OR_PASSWORD })
        }

        const { accessToken, refreshToken } = await signupService(id, password)

        return res.status(201).json({ accessToken, refreshToken })
    } catch (err: any) {
        if (err.message === USER_EXISTS) {
            return res.status(401).json({ error: USER_EXISTS })
        }
        logger.error('Signup Controller error:', err)

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { signupController }
