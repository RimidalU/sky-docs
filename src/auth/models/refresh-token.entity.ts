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

    @Column({ type: 'varchar', length: 255, unique: true })
    token!: string

    @Column()
    expiresAt!: Date

    @Column({ default: false })
    revoked!: boolean

    @ManyToOne(() => User, (user: User) => user.refreshTokens, {
        onDelete: 'CASCADE',
    })
    user!: Relation<User>
}
