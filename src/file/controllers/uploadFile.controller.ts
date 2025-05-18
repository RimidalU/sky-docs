import { Response } from 'express'
import logger from '../../utils/logger.utils.js'
import { AuthRequest } from '../../types/common.types.js'
import { INTERNAL_SERVER_ERROR } from '../../constants/err.constants.js'
import { uploadFileService } from '../services/uploadFile.service.js'
import { USER_NOT_FOUND } from '../../auth/constants/err.constants.js'
import { MISSING_FILE } from '../constants/err.constants.js'

const uploadFileController = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ error: MISSING_FILE })

        const userId = req.userId as number
        const fileData = req.file

        const file = await uploadFileService(userId, fileData)

        res.status(201).json(file)
    } catch (err: any) {
        if (err.message === USER_NOT_FOUND) {
            return res.status(401).json({ error: USER_NOT_FOUND })
        }
        logger.error('UploadFileController Controller error:', err)

        return res.status(500).json({ error: INTERNAL_SERVER_ERROR })
    }
}

export { uploadFileController }
