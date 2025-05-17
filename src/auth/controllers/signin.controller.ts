import { Response } from 'express'
import { signinService } from '../services/signin.service.js'
import logger from '../../utils/logger.utils.js'
import {
    INVALID_CREDENTIALS,
    MISSING_ID_OR_PASSWORD,
} from '../constants/err.constants.js'
import { AuthRequest } from '../../types/common.types.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'

interface SigninRequest extends AuthRequest {
    body: {
        id: string
        password: string
    }
}

const signinController = async (req: SigninRequest, res: Response) => {
    try {
        const { id, password } = req.body

        if (!id || !password) {
            return res.status(400).json({ error: MISSING_ID_OR_PASSWORD })
        }

        const tokens = await signinService(id, password)

        return res.status(201).json(tokens)
    } catch (err: any) {
        if (err.message === INVALID_CREDENTIALS) {
            return res.status(401).json({ error: INVALID_CREDENTIALS })
        }
        logger.error('Signin Controller error:', err)

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { signinController }
