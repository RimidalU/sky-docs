import { Router } from 'express'

import { signupController } from '../controllers/signup.controller.js'

const signupRouter = Router()

signupRouter.post('/', signupController)

export { signupRouter }
