import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Relation,
} from 'typeorm'
import { RefreshToken } from './refresh-token.entity.js'
import { File } from '../../file/models/file.entity.js'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true, type: 'varchar', length: 255 })
    identifier!: string // email or telephone

    @Column({ type: 'varchar', length: 255 })
    password!: string

    @OneToMany(() => RefreshToken, (token: RefreshToken) => token.user)
    refreshTokens!: Relation<RefreshToken>[]

    @OneToMany(() => File, (file: File) => file.user)
    files!: Relation<File>[]
}
