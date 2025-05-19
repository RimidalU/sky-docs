import path from 'path'
import fs from 'fs/promises'
import logger from '../../utils/logger.utils.js'
import { UPLOAD_DIR } from '../constants/common.constants.js'

const uploadDir = path.resolve(UPLOAD_DIR)

const deleteLocalFile = async (fileName: string): Promise<void> => {
    const filePath = path.join(uploadDir, fileName)
    try {
        await fs.unlink(filePath)
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            return
        }
        logger.error(`Failed to delete file ${fileName}:`, err)
        throw err
    }
}

const sanitizeFileName = (name: string): string => {
    return name
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9-_]/g, '')
}

const generateUniqueFileName = (baseName: string, ext: string): string => {
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substring(2, 8)
    return `${baseName}-${timestamp}-${randomSuffix}${ext}`
}

const getSanitizeFileNameAndExt = (name: string) => {
    const parsed = path.parse(name)
    const safeName = sanitizeFileName(parsed.name)
    const ext = parsed.ext.toLowerCase()

    return {
        safeName,
        ext,
    }
}
export {
    deleteLocalFile,
    sanitizeFileName,
    generateUniqueFileName,
    getSanitizeFileNameAndExt,
}
