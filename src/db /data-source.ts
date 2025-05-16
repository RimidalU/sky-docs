import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { DataSource } from 'typeorm'
import { getEnv } from '../utils/env.utils.js'

const nodeEnv = getEnv('NODE_ENV', 'development')
const isDevelopment = nodeEnv === 'development'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: getEnv('DB_HOST'),
    port: Number(getEnv('DB_PORT', 3306)),
    username: getEnv('DB_USER'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
    entities: [__dirname + '/../**/models/*.entity.{ts,js}'],
    synchronize: isDevelopment,
    logging: false,
    migrations: ['/migrations/*.{ts,js}'],
})
