import { Response } from 'express'
import logger from '../../utils/logger.utils.js'
import { AuthRequest } from '../../types/common.types.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import {
    FILE_NOT_FOUND,
    INVALID_PAGINATION_PARAMS,
} from '../constants/err.constants.js'
import { listFilesService } from '../services/listFiles.service.js'

const listFilesController = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId as number

        const page = Number(req.query.page) || 1
        const listSize = Number(req.query.list_size) || 10

        if (page < 1 || listSize < 1) {
            return res.status(400).json({ error: INVALID_PAGINATION_PARAMS })
        }

        const listFilesInfo = await listFilesService(userId, page, listSize)

        res.status(200).json(listFilesInfo)
    } catch (err: any) {
        if (err.message === FILE_NOT_FOUND) {
            return res.status(404).json({ error: FILE_NOT_FOUND })
        }
        logger.error('ListFilesController controller error:', err)

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { listFilesController }
