import { Column, JoinColumn, OneToMany, OneToOne, BaseEntity, PrimaryGeneratedColumn, Entity, PrimaryColumn } from "typeorm";
import { UserEntity } from './user.entity'

@Entity('dept')
export class DeptEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'int'})
    num: number;

    @Column({type:'varchar'})
    name: string;   

    @OneToMany(type => UserEntity, user => user.deptInfo)
    users: UserEntity[];
}