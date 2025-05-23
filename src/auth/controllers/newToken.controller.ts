import { Response, Request } from 'express'
import logger from '../../utils/logger.utils.js'
import {
    INVALID_REFRESH_TOKEN,
    MISSING_REFRESH_TOKEN,
} from '../constants/err.constants.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import { newTokenService } from '../services/newToken.service.js'
import { generateFingerprint } from '../../utils/auth.utils.js'

interface NewTokenRequest extends Request {
    body: {
        refreshToken: string
    }
}

const newTokenController = async (req: NewTokenRequest, res: Response) => {
    try {
        const { refreshToken } = req.body

        if (!refreshToken) {
            return res.status(400).json({ error: MISSING_REFRESH_TOKEN })
        }

        const fingerprint = generateFingerprint(req)

        const tokens = await newTokenService(refreshToken, fingerprint)

        return res.status(201).json(tokens)
    } catch (err: any) {
        if (err.message === INVALID_REFRESH_TOKEN) {
            return res.status(401).json({ error: INVALID_REFRESH_TOKEN })
        }
        logger.error('NewTokenController Controller error:', err)

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { newTokenController }
