import { Router } from 'express'
import { upload } from '../../middleware/upload.middleware.js'
import { uploadFileController } from '../controllers/uploadFile.controller.js'

const fileRouter = Router()

fileRouter.post('/upload', upload.single('file'), uploadFileController)
// fileRouter.get('/list', listFilesController)
// fileRouter.delete('/delete/:id', deleteFileController)
// fileRouter.get('/:id', getFileInfoController)
// fileRouter.get('/download/:id', downloadFileController)
// fileRouter.put('/update/:id', upload.single('file'), updateFileController)

export { fileRouter }
