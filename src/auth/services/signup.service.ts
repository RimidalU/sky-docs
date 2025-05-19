import { saveRefreshToken } from '../repositories/refresh-token.repository.js'
import { createUserIfNotExist } from '../repositories/user.repository.js'
import { createPasswordHash, getRandomUUID } from '../utils/crypto.utils.js'
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/token.utils.js'

const signupService = async (
    id: string,
    password: string,
    fingerprint: string
) => {
    try {
        const hashedPassword = await createPasswordHash(password)

        const user = await createUserIfNotExist(id, hashedPassword)
        const jti = getRandomUUID()

        const accessToken = generateAccessToken(user.id, jti)
        const refreshToken = generateRefreshToken(user.id, jti)

        await saveRefreshToken({
            token: refreshToken.token,
            jti,
            fingerprint,
            expiresAt: refreshToken.expiresAt,
            user,
        })

        return { accessToken, refreshToken: refreshToken.token }
    } catch (err) {
        throw err
    }
}

export { signupService }
