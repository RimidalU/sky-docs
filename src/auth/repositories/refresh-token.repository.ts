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

const getRefreshTokenByUserId = async (userId: number) => {
    const refreshToken = await refreshTokenRepository.findOne({
        where: { user: { id: userId } },
    })
    return refreshToken
}

const deleteRefreshTokensByUserId = async (userId: number) => {
    await refreshTokenRepository.delete({ user: { id: userId } })
}

export {
    saveRefreshToken,
    getRefreshTokenByUserId,
    deleteRefreshTokensByUserId,
}
