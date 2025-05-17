import { QueryFailedError } from 'typeorm'
import { AppDataSource } from '../../db /data-source.js'
import { USER_EXISTS } from '../constants/err.constants.js'
import { User } from '../models/user.entity.js'

const userRepository = AppDataSource.getRepository(User)

const createUserIfNotExist = async (
    id: string,
    hashedPassword: string
): Promise<User> => {
    const user = userRepository.create({
        identifier: id,
        password: hashedPassword,
    })

    try {
        return await userRepository.save(user)
    } catch (error) {
        if (
            error instanceof QueryFailedError &&
            error.driverError?.code === 'ER_DUP_ENTRY'
        ) {
            throw new Error(USER_EXISTS)
        }
        throw error
    }
}
const findUserByIdentifier = async (id: string): Promise<User | null> => {
    return await userRepository.findOne({ where: { identifier: id } })
}

export { findUserByIdentifier, createUserIfNotExist }
