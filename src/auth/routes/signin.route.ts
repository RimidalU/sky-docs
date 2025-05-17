import { Router } from 'express'
import { signinController } from '../controllers/signin.controller.js'
import { newTokenController } from '../controllers/newToken.controller.js'

const signinRouter = Router()

signinRouter.post('/', signinController)
signinRouter.post('/new_token', newTokenController)

export { signinRouter }
