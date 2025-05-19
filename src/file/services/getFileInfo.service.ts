import { FILE_NOT_FOUND } from '../constants/err.constants.js'
import { getFileInfoByIdAndUserId } from '../repositories/file.repository.js'

const getFileInfoService = async (userId: number, fileId: number) => {
    try {
        const fileInfo = await getFileInfoByIdAndUserId(userId, fileId)

        if (!fileInfo) {
            throw new Error(FILE_NOT_FOUND)
        }
        return {
            name: fileInfo.name,
            extension: fileInfo.extension,
            mimeType: fileInfo.mimeType,
            size: fileInfo.size,
            uploadedAt: fileInfo.uploadedAt,
        }
    } catch (err) {
        throw err
    }
}

export { getFileInfoService }
