import { Response } from 'express'
import logger from '../../utils/logger.utils.js'
import { USER_NOT_FOUND } from '../constants/err.constants.js'
import { AuthRequest } from '../../types/common.types.js'
import {
    INTERNAL_SERVER_ERROR,
    NO_CONTENT,
} from '../../constants/err.constants.js'
import { logoutService } from '../services/logout.service.js'

const logoutController = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req
        if (!userId) {
            return res.status(403).json({ message: USER_NOT_FOUND })
        }

        await logoutService(userId)

        return res.status(204).send()
    } catch (err: any) {
        if (err.message === USER_NOT_FOUND) {
            return res.status(401).json({ error: USER_NOT_FOUND })
        }
        logger.error('LogoutController Controller error:', err)

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { logoutController }
