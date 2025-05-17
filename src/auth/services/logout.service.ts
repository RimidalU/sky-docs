import { deleteRefreshTokensByUserId } from '../repositories/refresh-token.repository.js'

const logoutService = async (userId: number) => {
    try {
        await deleteRefreshTokensByUserId(userId)
    } catch (err) {
        throw err
    }
}

export { logoutService }
