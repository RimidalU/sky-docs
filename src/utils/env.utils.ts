import dotenv from 'dotenv'
dotenv.config()

export const getEnv = (name: string, defaultValue?: string | number) => {
    const value = process.env[name] || defaultValue

    if (!value && defaultValue === undefined) {
        throw new Error(`${name} env variable must be provided`)
    }

    return (value || defaultValue || '').toString()
}
