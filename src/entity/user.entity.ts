import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DeptEntity } from './dept.entity'

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    user_name: string;

    @Exclude()
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

    @Column({type:'int',default:1,name:'dept_id'})
    deptId: number;

    @ManyToOne(type => DeptEntity, deptInfo => deptInfo.users)
    @JoinColumn({name:'dept_id'})
    deptInfo: DeptEntity;
}