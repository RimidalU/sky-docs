import { Response } from 'express'
import logger from '../../utils/logger.utils.js'
import { USER_NOT_FOUND } from '../constants/err.constants.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import { AuthRequest } from '../../types/common.types.js'
import { infoService } from '../services/info.service.js'

const infoController = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId as number

        const identifier = await infoService(userId)

        return res.status(201).json({ id: identifier })
    } catch (err: any) {
        if (err.message === USER_NOT_FOUND) {
            return res.status(401).json({ error: USER_NOT_FOUND })
        }
        logger.error('InfoController Controller error:', err)

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { infoController }
