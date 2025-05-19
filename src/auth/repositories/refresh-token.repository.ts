import { AppDataSource } from '../../db /data-source.js'
import { RefreshToken } from '../models/refresh-token.entity.js'
import { User } from '../models/user.entity.js'

const refreshTokenRepository = AppDataSource.getRepository(RefreshToken)

interface SaveRefreshTokenPayload {
    token: string
    fingerprint: string
    user: User
    expiresAt: Date
}
const saveRefreshToken = async ({
    token,
    fingerprint,
    user,
    expiresAt,
}: SaveRefreshTokenPayload) => {
    const refreshToken = refreshTokenRepository.create({
        token,
        fingerprint,
        user,
        expiresAt,
        revoked: false,
    })
    await refreshTokenRepository.save(refreshToken)
}

const getRefreshTokenByUserIdAndFingerprint = async (
    userId: number,
    fingerprint: string
) => {
    const refreshToken = await refreshTokenRepository.findOne({
        where: { fingerprint, user: { id: userId } },
    })
    return refreshToken
}

const deleteRefreshTokensByUserId = async (
    userId: number,
    fingerprint: string
) => {
    await refreshTokenRepository.delete({ fingerprint, user: { id: userId } })
}

const validateRefreshTokenStored = async (
    refreshToken: string,
    fingerprint: string
) => {
    const refreshTokenStored = await refreshTokenRepository.findOne({
        where: { token: refreshToken, revoked: false, fingerprint },
    })
    return refreshTokenStored
}

export {
    saveRefreshToken,
    getRefreshTokenByUserIdAndFingerprint,
    deleteRefreshTokensByUserId,
    validateRefreshTokenStored,
}
