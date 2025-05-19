import bcrypt from 'bcrypt'
import crypto from 'crypto'

const SALT_ROUNDS = 10

const createPasswordHash = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}
const comparePassword = async (password: string, passwordHash: string) =>
    await bcrypt.compare(password, passwordHash)

const getRandomUUID = () => crypto.randomUUID()

export { createPasswordHash, comparePassword, getRandomUUID }
