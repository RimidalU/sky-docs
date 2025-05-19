import { Response } from 'express'
import logger from '../../utils/logger.utils.js'
import { AuthRequest } from '../../types/common.types.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import { FILE_NOT_FOUND, INVALID_FILE_ID } from '../constants/err.constants.js'
import { deleteFileService } from '../services/deleteFile.service.js'

const deleteFileController = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId as number
        const fileId = Number(req.params.id)

        if (isNaN(fileId)) {
            return res.status(400).json({ error: INVALID_FILE_ID })
        }

        await deleteFileService(userId, fileId)

        return res.status(204).send()
    } catch (err: any) {
        if (err.message === FILE_NOT_FOUND) {
            return res.status(404).json({ error: FILE_NOT_FOUND })
        }
        logger.error('DeleteFile Controller error:', err)

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { deleteFileController }
