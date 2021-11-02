import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DeptEntity } from './dept.entity'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'email'})
    email: string;

    @Column({name:'user_name'})
    user_name: string;

    @Column({select:false})
    user_password: string;

    @Column({type:"varchar",default:null,name:'user_phone'})
    user_phone: string;

    @Column({type:"varchar",default:null,name:'user_avatar'})
    user_avatar: string;

    @Column({type:"int",default:1,name:'user_sex'})
    user_sex: number;

    @Column({type:"varchar",default:null,name:'user_profile'})
    user_profile: string;

    @Column({select:false})
    create_time: Date;

    @Column({select:false})
    update_tiem: Date;

    @Column({type:'int', default:1,select:false})
    deptId: number;

    // @ManyToOne(() => DeptEntity, dept_id => dept_id.users)
    // //指定本表中的外键（JoinColumn只存在于多端，因为外键只会存在于多端）
    // @JoinColumn({name:'detp_id'})
    // dept_id: DeptEntity;
}