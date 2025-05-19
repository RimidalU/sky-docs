import { addToBlacklist } from '../../utils/tokenBlacklist.utils.js'
import { deleteRefreshTokensByUserId } from '../repositories/refresh-token.repository.js'

const logoutService = async (
    userId: number,
    fingerprint: string,
    jti: string
) => {
    try {
        await addToBlacklist(jti, userId)
        await deleteRefreshTokensByUserId(userId, fingerprint, jti)
    } catch (err) {
        throw err
    }
}

export { logoutService }
