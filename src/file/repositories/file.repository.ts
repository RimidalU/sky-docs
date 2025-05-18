import { AppDataSource } from '../../db /data-source.js'
import { File } from '../models/file.entity.js'
import { MulterFile } from '../types/common.types.js'
import { getSanitizeFileNameAndExt } from '../utils/common.utils.js'

const fileRepository = AppDataSource.getRepository(File)

const createFile = async (userId: number, file: MulterFile): Promise<File> => {
    const { safeName, ext } = getSanitizeFileNameAndExt(file.filename)

    const newFile = fileRepository.create({
        name: safeName,
        extension: ext,
        mimeType: file.mimetype,
        size: file.size,
        user: { id: userId },
    })
    await fileRepository.save(newFile)

    return newFile
}

const getFileInfoByIdAndUserId = async (userId: number, fileId: number) => {
    const file = await fileRepository.findOne({
        where: { id: fileId, user: { id: userId } },
    })
    return file
}

const removeFile = async (userId: number, fileId: number) => {
    await fileRepository.delete({ id: fileId, user: { id: userId } })
}

export { createFile, getFileInfoByIdAndUserId, removeFile }
