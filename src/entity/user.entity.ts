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

    @Column({type:"varchar",default:null})
    user_phone: string;

    @Column({type:"varchar",default:null})
    user_avatar: string;

    @Column({type:"int",default:1})
    user_sex: number;

    @Column({type:"varchar",default:null})
    user_profile: string;

    @Column()
    create_time: Date;

    @Column()
    update_tiem: Date;
}