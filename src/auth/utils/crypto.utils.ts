import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

const createPasswordHash = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}
const comparePassword = async (password: string, passwordHash: string) =>
    await bcrypt.compare(password, passwordHash)

export { createPasswordHash, comparePassword }
