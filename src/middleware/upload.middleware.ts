import multer from 'multer'
import path from 'path'
import fs from 'fs'
import {
    generateUniqueFileName,
    getSanitizeFileNameAndExt,
} from '../file/utils/common.utils.js'
import { UPLOAD_DIR } from '../file/constants/common.constants.js'

const uploadDir = path.join(process.cwd(), UPLOAD_DIR)

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),

    filename: (_req, file, cb) => {
        const { safeName, ext } = getSanitizeFileNameAndExt(file.originalname)

        const fileName = generateUniqueFileName(safeName, ext)
        cb(null, fileName)
    },
})

export const upload = multer({ storage })
