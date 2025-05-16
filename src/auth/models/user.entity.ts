import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Relation,
} from 'typeorm'
import { RefreshToken } from './refresh-token.entity.js'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true, type: 'varchar', length: 255 })
    identifier!: string // email or telephone

    @Column({ type: 'varchar', length: 255 })
    password!: string //TODO: add Hash

    @OneToMany(() => RefreshToken, (token: RefreshToken) => token.user)
    refreshTokens!: Relation<RefreshToken>[]
}
