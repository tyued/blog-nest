import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('article')
export class ArticleEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar'})
    title: string;

    @Column({type:'int'})
    authId: number;

    @Column({type:'int'})
    articleTypeId: number;

    @Column({type:'varchar'})
    subTitle: string;

    @Column({type:'varchar'})
    content: string;

    @Column({type:'int'})
    views: number;

    @Column({type:'int'})
    praise: number;

    @Column({type:'date'})
    create_time: Date;

    @Column({type:'date'})
    update_time: Date;

}