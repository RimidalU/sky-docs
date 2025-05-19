import { Router } from 'express'
import { infoController } from '../controllers/info.controller.js'
import { checkAuth } from '../../middleware/auth.middleware.js'
import { setUserId } from '../../middleware/setUserId.middleware.js'

const infoRouter = Router()

infoRouter.get('/', setUserId, checkAuth, infoController)

export { infoRouter }
