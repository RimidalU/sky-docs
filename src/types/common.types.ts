import { Request } from 'express'

type StringRecord = Record<string, string>

interface AuthRequest extends Request {
    userId?: number
}

export { StringRecord, AuthRequest }
