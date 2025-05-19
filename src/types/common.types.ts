import { Request } from 'express'

type StringRecord = Record<string, string>

interface AuthRequest extends Request {
    userId?: number
    fingerprint?: string
}

export { StringRecord, AuthRequest }
