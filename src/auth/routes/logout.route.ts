import { Router } from 'express'
import { logoutController } from '../controllers/logout.controller.js'
import { checkAuth } from '../../middleware/auth.middleware.js'

const logoutRouter = Router()

logoutRouter.get('/', checkAuth, logoutController)

export { logoutRouter }
