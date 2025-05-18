import { FILE_NOT_FOUND } from '../constants/err.constants.js'
import {
    getFileInfoByIdAndUserId,
    removeFile,
} from '../repositories/file.repository.js'
import { deleteLocalFile } from '../utils/common.utils.js'

const deleteFileService = async (userId: number, fileId: number) => {
    try {
        const fileInfo = await getFileInfoByIdAndUserId(userId, fileId)

        if (!fileInfo) {
            throw new Error(FILE_NOT_FOUND)
        }

        await deleteLocalFile(`${fileInfo.name}${fileInfo.extension}`)

        await removeFile(userId, fileId)
    } catch (err) {
        throw err
    }
}

export { deleteFileService }
