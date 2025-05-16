import 'reflect-metadata'

import { DataSource } from 'typeorm'
import { getEnv } from '../utils/env.utils.js'
import { User } from '../auth/models/user.entity.js'
import { RefreshToken } from '../auth/models/refresh-token.entity.js'

const nodeEnv = getEnv('NODE_ENV', 'development')
const isDevelopment = nodeEnv === 'development'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: getEnv('DB_HOST'),
    port: Number(getEnv('DB_PORT', 3306)),
    username: getEnv('DB_USER'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
    entities: [User, RefreshToken],
    synchronize: isDevelopment,
    logging: false,
    migrations: ['/migrations/*.{ts,js}'],
})
