import { INVALID_REFRESH_TOKEN } from '../constants/err.constants.js'
import {
    generateAccessToken,
    generateRefreshToken,
    validateRefreshToken,
} from '../utils/token.utils.js'
import {
    deleteRefreshTokensByUserId,
    saveRefreshToken,
    validateRefreshTokenStored,
} from '../repositories/refresh-token.repository.js'
import { findUserById } from '../repositories/user.repository.js'

const newTokenService = async (refreshToken: string, fingerprint: string) => {
    try {
        const payloadToken = await validateRefreshToken(refreshToken)

        if (
            !payloadToken ||
            typeof payloadToken === 'string' ||
            payloadToken.fingerprint !== fingerprint
        ) {
            throw new Error(INVALID_REFRESH_TOKEN)
        }

        const userId = payloadToken.id

        if (!userId) {
            throw new Error(INVALID_REFRESH_TOKEN)
        }

        const isStoredToken = await validateRefreshTokenStored(
            refreshToken,
            fingerprint
        )

        if (!isStoredToken) {
            throw new Error(INVALID_REFRESH_TOKEN)
        }

        const user = await findUserById(userId)

        if (!user) {
            throw new Error(INVALID_REFRESH_TOKEN)
        }

        const accessToken = generateAccessToken(userId)
        const newRefreshToken = generateRefreshToken(userId)

        await deleteRefreshTokensByUserId(userId, fingerprint)

        await saveRefreshToken({
            token: newRefreshToken.token,
            fingerprint,
            expiresAt: newRefreshToken.expiresAt,
            user,
        })

        return { accessToken, refreshToken: newRefreshToken.token }
    } catch (err) {
        throw err
    }
}

export { newTokenService }
