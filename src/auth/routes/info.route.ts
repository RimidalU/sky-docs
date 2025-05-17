import { Router } from 'express'
import { infoController } from '../controllers/info.controller.js'
import { checkAuth } from '../../middleware/auth.middleware.js'

const infoRouter = Router()

infoRouter.get('/', checkAuth, infoController)

export { infoRouter }
