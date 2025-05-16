import { Router } from 'express'
import { signinController } from '../controllers/auth.controller.js'

const router = Router()

router.post('/signin', signinController)
router.post('/signin/new_token', () => {
    // TODO: refresh token
})
router.post('/signup', () => {
    // TODO: signup
})

router.get('/info', () => {
    // TODO: return user id
})
router.get('/logout', () => {
    // TODO: logout
})

export default router
