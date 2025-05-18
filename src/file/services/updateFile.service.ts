import path from 'path'

import {
    getFileInfoByIdAndUserId,
    updateFile,
} from '../repositories/file.repository.js'
import { deleteLocalFile } from '../utils/common.utils.js'
import { MulterFile } from '../types/common.types.js'

const updateFileService = async (
    userId: number,
    fileId: number,
    file: MulterFile
) => {
    try {
        const oldFile = await getFileInfoByIdAndUserId(userId, fileId)
        if (!oldFile) return null

        await deleteLocalFile(`${oldFile.name}${oldFile.extension}`)

        const newFile = await updateFile(oldFile, file)

        return newFile
    } catch (err) {
        throw err
    }
}

export { updateFileService }
