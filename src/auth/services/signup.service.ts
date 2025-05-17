import { saveRefreshToken } from '../repositories/refresh-token.repository.js'
import { createUserIfNotExist } from '../repositories/user.repository.js'
import { createPasswordHash } from '../utils/crypto.utils.js'
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/token.utils.js'

const signupService = async (id: string, password: string) => {
    try {
        const hashedPassword = await createPasswordHash(password)

        const user = await createUserIfNotExist(id, hashedPassword)

        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id)

        await saveRefreshToken({
            token: refreshToken.token,
            expiresAt: refreshToken.expiresAt,
            user,
        })

        return { accessToken, refreshToken: refreshToken.token }
    } catch (err) {
        throw err
    }
}

export { signupService }
