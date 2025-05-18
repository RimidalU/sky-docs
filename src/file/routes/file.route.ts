import { Router } from 'express'
import { upload } from '../../middleware/upload.middleware.js'
import { uploadFileController } from '../controllers/uploadFile.controller.js'
import { checkAuth } from '../../middleware/auth.middleware.js'
import { getFileInfoController } from '../controllers/getFileInfo.controller.js'
import { deleteFileController } from '../controllers/deleteFile.controller.js'
import { listFilesController } from '../controllers/listFiles.controller.js'
import { downloadFileController } from '../controllers/downloadFile.controller.js'

const fileRouter = Router()

fileRouter.post(
    '/upload',
    checkAuth,
    upload.single('file'),
    uploadFileController
)
fileRouter.get('/list', checkAuth, listFilesController)
fileRouter.delete('/delete/:id', checkAuth, deleteFileController)
fileRouter.get('/:id', checkAuth, getFileInfoController)
fileRouter.get('/download/:id', downloadFileController)
// fileRouter.put('/update/:id', upload.single('file'), updateFileController)

export { fileRouter }
