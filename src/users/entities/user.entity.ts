import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { UserRole } from '../enum/roles.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : true})
    name: string;

    @Column({nullable : true})
    email: string;

    @Column({nullable : true})
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER }) 
    role: UserRole;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}

