import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('articleType')
export class ArticleTypeEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar'})
    typeName: string;

    @Column({type:'date',default:new Date()})
    create_time: Date;

    @Column({type:'date',default:new Date()})
    update_time: Date;

}