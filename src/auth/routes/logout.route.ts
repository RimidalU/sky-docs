import { Router } from 'express'
import { logoutController } from '../controllers/logout.controller.js'
import { checkAuth } from '../../middleware/auth.middleware.js'
import { setUserId } from '../../middleware/setUserId.middleware.js'

const logoutRouter = Router()

logoutRouter.get('/', setUserId, checkAuth, logoutController)

export { logoutRouter }
