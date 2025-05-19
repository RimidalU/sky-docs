import { Response, Request } from 'express'
import { signinService } from '../services/signin.service.js'
import logger from '../../utils/logger.utils.js'
import {
    INVALID_CREDENTIALS,
    MISSING_ID_OR_PASSWORD,
} from '../constants/err.constants.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import { generateFingerprint } from '../../utils/auth.utils.js'

const signinController = async (req: Request, res: Response) => {
    try {
        const { id, password } = req.body

        if (!id || !password) {
            return res.status(400).json({ error: MISSING_ID_OR_PASSWORD })
        }

        const fingerprint = generateFingerprint(req)

        const tokens = await signinService(id, password, fingerprint)

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
