import { Request } from 'express'

type StringRecord = Record<string, string>

interface AuthRequest extends Request {
    userId?: number
    fingerprint?: string
    jti?: string
}

export { StringRecord, AuthRequest }
