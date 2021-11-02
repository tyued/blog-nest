import { Column, JoinColumn, OneToMany, OneToOne, BaseEntity, PrimaryGeneratedColumn, Entity, PrimaryColumn } from "typeorm";
import { UserEntity } from './user.entity'

@Entity('dept')
export class DeptEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'int',select:false})
    num: number;

    @Column({type:'varchar',name:'deptName'})
    name: string;

    // @OneToMany(() => UserEntity, user => user.dept_id)
    // users: [];
}