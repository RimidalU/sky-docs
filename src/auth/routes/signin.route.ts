import { Router } from 'express'
import { signinController } from '../controllers/auth.controller.js'

const signinRouter = Router()

signinRouter.post('/', signinController)
signinRouter.post('/new_token', () => {
    // TODO: refresh token
})

export { signinRouter }
