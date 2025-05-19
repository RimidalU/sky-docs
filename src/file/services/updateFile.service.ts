import path from 'path'

import {
    getFileInfoByIdAndUserId,
    updateFile,
} from '../repositories/file.repository.js'
import { deleteLocalFile } from '../utils/common.utils.js'
import { MulterFile } from '../types/common.types.js'
import { FILE_NOT_FOUND } from '../constants/err.constants.js'

const updateFileService = async (
    userId: number,
    fileId: number,
    file: MulterFile
) => {
    try {
        const oldFile = await getFileInfoByIdAndUserId(userId, fileId)

        if (!oldFile) {
            await deleteLocalFile(file.filename)
            throw new Error(FILE_NOT_FOUND)
        }

        await deleteLocalFile(`${oldFile.name}${oldFile.extension}`)

        const newFile = await updateFile(oldFile, file)

        return newFile
    } catch (err) {
        throw err
    }
}

export { updateFileService }
