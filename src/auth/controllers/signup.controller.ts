import { Request, Response } from 'express'
import logger from '../../utils/logger.utils.js'
import {
    MISSING_ID_OR_PASSWORD,
    USER_EXISTS,
} from '../constants/err.constants.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import { createPasswordHash } from '../utils/crypto.utils.js'
import { createUserIfNotExist } from '../repositories/user.repository.js'
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/token.utils.js'
import { saveRefreshToken } from '../repositories/refresh-token.repository.js'
import { signupService } from '../services/signup.service.js'

interface SignupRequest extends Request {
    body: {
        id: string
        password: string
    }
}

type SignupParams = {
    id: string
    password: string
}
const signupController = async (req: SignupRequest, res: Response) => {
    try {
        const { id, password } = req.body as SignupParams

        if (!id || !password) {
            return res.status(400).json({ error: MISSING_ID_OR_PASSWORD })
        }

        const { accessToken, refreshToken } = await signupService(id, password)

        return res.status(201).json({ accessToken, refreshToken })
    } catch (err: any) {
        logger.error('Signup Controller error:', err)

        if (err.message === USER_EXISTS) {
            return res.status(401).json({ error: USER_EXISTS })
        }
        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { signupController }
