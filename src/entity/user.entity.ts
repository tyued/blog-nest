import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    user_name: string;

    @Column()
    user_password: string;

    @Column()
    user_phone: string;

    @Column()
    user_avatar: string;

    @Column()
    user_sex: number;

    @Column()
    user_profile: string;

    @Column()
    create_time: Date;

    @Column()
    update_tiem: Date;
}