import { Router } from 'express'
import { upload } from '../../middleware/upload.middleware.js'
import { uploadFileController } from '../controllers/uploadFile.controller.js'
import { checkAuth } from '../../middleware/auth.middleware.js'
import { getFileInfoController } from '../controllers/getFileInfo.controller.js'
import { deleteFileController } from '../controllers/deleteFile.controller.js'
import { listFilesController } from '../controllers/listFiles.controller.js'
import { downloadFileController } from '../controllers/downloadFile.controller.js'
import { updateFileController } from '../controllers/updateFile.controller.js'
import { setUserId } from '../../middleware/setUserId.middleware.js'

const fileRouter = Router()

fileRouter.post(
    '/upload',
    setUserId,
    checkAuth,
    upload.single('file'),
    uploadFileController
)
fileRouter.get('/list', setUserId, checkAuth, listFilesController)
fileRouter.delete('/delete/:id', setUserId, checkAuth, deleteFileController)
fileRouter.get('/:id', setUserId, checkAuth, getFileInfoController)
fileRouter.get('/download/:id', setUserId, checkAuth, downloadFileController)
fileRouter.put(
    '/update/:id',
    setUserId,
    checkAuth,
    upload.single('file'),
    updateFileController
)

export { fileRouter }
