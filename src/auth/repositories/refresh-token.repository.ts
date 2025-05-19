import { AppDataSource } from '../../db /data-source.js'
import { RefreshToken } from '../models/refresh-token.entity.js'
import { User } from '../models/user.entity.js'

const refreshTokenRepository = AppDataSource.getRepository(RefreshToken)

interface SaveRefreshTokenPayload {
    token: string
    jti: string
    fingerprint: string
    user: User
    expiresAt: Date
}
const saveRefreshToken = async ({
    token,
    jti,
    fingerprint,
    user,
    expiresAt,
}: SaveRefreshTokenPayload) => {
    const refreshToken = refreshTokenRepository.create({
        token,
        jti,
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
    fingerprint: string,
    jti: string
) => {
    await refreshTokenRepository.update(
        { fingerprint, user: { id: userId }, jti },
        { revoked: true }
    )
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
