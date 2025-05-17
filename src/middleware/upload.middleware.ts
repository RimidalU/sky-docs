import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = path.join(process.cwd(), 'uploads')

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const timestamp = Date.now()
        const ext = path.extname(file.originalname)
        const safeName = file.originalname
            .replace(ext, '')
            .replace(/[^a-zA-Z0-9-_]/g, '')
        cb(null, `${safeName}-${timestamp}${ext}`)
    },
})

export const upload = multer({ storage })
