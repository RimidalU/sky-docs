import { AppDataSource } from '../../db /data-source.js'
import { File } from '../models/file.entity.js'
import { MulterFile } from '../types/common.types.js'
import { getFileNameWithoutExt } from '../utils/common.utils.js'

const fileRepository = AppDataSource.getRepository(File)

const createFile = async (userId: number, file: MulterFile): Promise<File> => {
    const name = getFileNameWithoutExt(file.originalname)

    const newFile = fileRepository.create({
        name,
        extension: file.originalname.split('.').pop(),
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

export { createFile, getFileInfoByIdAndUserId }
