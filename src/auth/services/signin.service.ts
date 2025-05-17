import { INVALID_CREDENTIALS } from '../constants/err.constants.js'
import { findUserByIdentifier } from '../repositories/user.repository.js'
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/token.utils.js'
import { comparePassword } from '../utils/crypto.utils.js'
import {
    deleteRefreshTokensByUserId,
    saveRefreshToken,
} from '../repositories/refresh-token.repository.js'

export interface TokenPair {
    accessToken: string
    refreshToken: string
}

const signinService = async (id: string, password: string) => {
    try {
        const user = await findUserByIdentifier(id)
        if (!user) {
            throw new Error(INVALID_CREDENTIALS)
        }

        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            throw new Error(INVALID_CREDENTIALS)
        }

        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id)

        await deleteRefreshTokensByUserId(user.id)

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

export { signinService }
