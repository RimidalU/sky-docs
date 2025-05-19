import { deleteRefreshTokensByUserId } from '../repositories/refresh-token.repository.js'

const logoutService = async (userId: number, fingerprint: string) => {
    try {
        await deleteRefreshTokensByUserId(userId, fingerprint)
    } catch (err) {
        throw err
    }
}

export { logoutService }
