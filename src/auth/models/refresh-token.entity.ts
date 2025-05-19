import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Relation,
} from 'typeorm'
import { User } from './user.entity.js'

@Entity('refresh_tokens')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true, type: 'varchar', length: 36 })
    jti!: string

    @Column({ type: 'varchar', length: 255, unique: true })
    token!: string

    @Column({ type: 'varchar', length: 64 })
    fingerprint!: string

    @Column({ type: 'timestamp' })
    expiresAt!: Date

    @Column({ default: false, type: 'boolean' })
    revoked!: boolean

    @ManyToOne(() => User, (user: User) => user.refreshTokens, {
        onDelete: 'CASCADE',
    })
    user!: Relation<User>
}
