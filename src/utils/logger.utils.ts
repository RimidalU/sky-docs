import { COLORS, Level, RESET, levels } from '../constants/logger.constants.js'

import { getEnv } from './env.utils.js'

const currentLevel = getEnv('LOG_LEVEL', 'log')

const shouldLog = (level: Level): boolean => {
    return levels.indexOf(level) <= levels.indexOf(currentLevel as Level)
}

const getTimestamp = () => {
    return new Date().toISOString()
}

function logger(level: Level, ...args: unknown[]) {
    if (!shouldLog(level)) return

    const color = COLORS[level] || COLORS.log
    const prefix = `${color}[${level.toUpperCase()}] ${getTimestamp()}: ${RESET}`
    // eslint-disable-next-line no-console
    console[level](prefix, ...args)
}

export default {
    error: (...args: unknown[]) => logger('error', ...args),
    warn: (...args: unknown[]) => logger('warn', ...args),
    info: (...args: unknown[]) => logger('info', ...args),
    log: (...args: unknown[]) => logger('log', ...args),
}
