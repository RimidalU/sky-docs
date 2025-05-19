import { Response } from 'express'
import logger from '../../utils/logger.utils.js'
import { AuthRequest } from '../../types/common.types.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import { FILE_NOT_FOUND, INVALID_FILE_ID } from '../constants/err.constants.js'
import { downloadFileService } from '../services/downloadFile.service.js'

const downloadFileController = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId as number
        const fileId = Number(req.params.id)

        if (isNaN(fileId)) {
            return res.status(400).json({ error: INVALID_FILE_ID })
        }
        const fileStreamData = await downloadFileService(userId, fileId)

        if (!fileStreamData) {
            return res.status(404).json({ error: FILE_NOT_FOUND })
        }

        res.setHeader('Content-Type', fileStreamData.mimeType)
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${encodeURIComponent(fileStreamData.originalName)}"`
        )

        fileStreamData.stream.pipe(res)
    } catch (err: any) {
        logger.error('GetFileInfo Controller error:', err)

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { downloadFileController }
