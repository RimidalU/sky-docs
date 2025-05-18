import path from 'path'
import fs from 'fs'

import { getFileInfoByIdAndUserId } from '../repositories/file.repository.js'
import { UPLOAD_DIR } from '../constants/common.constants.js'

const downloadFileService = async (userId: number, fileId: number) => {
    try {
        const file = await getFileInfoByIdAndUserId(userId, fileId)
        if (!file) return null

        const uploadDir = path.resolve(UPLOAD_DIR)
        const filePath = path.join(uploadDir, `${file.name}${file.extension}`)

        if (!fs.existsSync(filePath)) return null

        const stream = fs.createReadStream(filePath)
        return {
            stream,
            mimeType: file.mimeType,
            originalName:
                file.name + (file.extension ? '.' + file.extension : ''),
        }
    } catch (err) {
        throw err
    }
}

export { downloadFileService }
