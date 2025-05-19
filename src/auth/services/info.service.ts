import { USER_NOT_FOUND } from '../constants/err.constants.js'

import { findUserById } from '../repositories/user.repository.js'

const infoService = async (userId: number) => {
    try {
        const user = await findUserById(userId)

        if (!user) {
            throw new Error(USER_NOT_FOUND)
        }

        return user.identifier
    } catch (err) {
        throw err
    }
}

export { infoService }
