import { AppDataSource } from '../../db /data-source.js'
import { RefreshToken } from '../models/refresh-token.entity.js'
import { User } from '../models/user.entity.js'

const refreshTokenRepository = AppDataSource.getRepository(RefreshToken)

interface SaveRefreshTokenPayload {
    token: string
    user: User
    expiresAt: Date
}
const saveRefreshToken = async ({
    token,
    user,
    expiresAt,
}: SaveRefreshTokenPayload) => {
    const refreshToken = refreshTokenRepository.create({
        token,
        user,
        expiresAt,
        revoked: false,
    })
    await refreshTokenRepository.save(refreshToken)
}

export { saveRefreshToken }
