import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert } from "typeorm"
import bcryptjs from 'bcryptjs';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password:string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcryptjs.hash(this.password, 10);
    }
}
