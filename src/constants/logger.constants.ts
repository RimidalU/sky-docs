import { StringRecord } from '../types/common.types.js'

const RESET = '\x1b[0m'
const COLORS: StringRecord = {
    error: '\x1b[31m',
    warn: '\x1b[33m',
    info: '\x1b[34m',
    log: '\x1b[37m',
}

const levels = ['error', 'warn', 'info', 'log'] as const

type Level = (typeof levels)[number]

export { RESET, COLORS, levels }
export type { Level }
