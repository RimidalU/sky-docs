import path from 'path'
import { MulterFile } from '../types/common.types.js'
import { createFile } from '../repositories/file.repository.js'

const uploadFileService = async (userId: number, file: MulterFile) => {
    try {
        console.log(userId)

        const newFile = await createFile(userId, file)
        return newFile
    } catch (err) {
        throw err
    }
}

export { uploadFileService }
