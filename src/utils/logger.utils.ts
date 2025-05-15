import { Level, levels } from '../constants/logger.constants.js'

import { getEnv } from './env.utils.js'

const currentLevel = getEnv('LOG_LEVEL', 'log')

const shouldLog = (level: Level): boolean => {
    return levels.indexOf(level) <= levels.indexOf(currentLevel as Level)
}

const getTimestamp = () => {
    return new Date().toISOString()
}

export { shouldLog, getTimestamp }
