import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    Relation,
} from 'typeorm'
import { User } from '../../auth/models/user.entity.js'

@Entity('files')
export class File {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 255 })
    name!: string

    @Column({ type: 'varchar', length: 50 })
    extension!: string

    @Column({ type: 'varchar', length: 100 })
    mimeType!: string

    @Column({ type: 'bigint' })
    size!: number

    @CreateDateColumn({ type: 'timestamp' })
    uploadedAt!: Date

    @ManyToOne(() => User, (user: User) => user.files, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    user!: Relation<User>
}
