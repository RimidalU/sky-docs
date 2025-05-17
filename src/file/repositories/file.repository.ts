import { AppDataSource } from '../../db /data-source.js'
import { File } from '../models/file.entity.js'
import { MulterFile } from '../types/common.types.js'

const fileRepository = AppDataSource.getRepository(File)

const createFile = async (userId: number, file: MulterFile): Promise<File> => {
    const newFile = fileRepository.create({
        name: file.originalname,
        extension: file.originalname.split('.').pop(),
        mimeType: file.mimetype,
        size: file.size,
        user: { id: userId },
    })
    await fileRepository.save(newFile)

    return newFile
}

export { createFile }
