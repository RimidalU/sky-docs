import { Response } from 'express'
import logger from '../../utils/logger.utils.js'
import { AuthRequest } from '../../types/common.types.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import { FILE_NOT_FOUND, MISSING_FILE } from '../constants/err.constants.js'
import { updateFileService } from '../services/updateFile.service.js'
import { deleteLocalFile } from '../utils/common.utils.js'

const updateFileController = async (req: AuthRequest, res: Response) => {
    const userId = req.userId as number
    const fileId = Number(req.params.id)
    const fileData = req.file

    try {
        if (!fileData) {
            return res.status(400).json({ error: MISSING_FILE })
        }

        if (isNaN(fileId)) {
            await deleteLocalFile(fileData.filename)

            return res.status(400).json({ error: FILE_NOT_FOUND })
        }

        const file = await updateFileService(userId, fileId, fileData)

        res.status(201).json(file)
    } catch (err: any) {
        logger.error('UpdatedFileController Controller error:', err)
        fileData && (await deleteLocalFile(fileData.filename))

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { updateFileController }
