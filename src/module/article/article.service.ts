/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleTypeEntity } from 'src/entity/articleType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService { 
    constructor(@InjectRepository(ArticleTypeEntity) private readonly articleTypeRepository:Repository<ArticleTypeEntity>){}


    async createArticleType(param){
        let checkRes = await this.articleTypeRepository.findOne({typeName:param.typeName})
        if(checkRes){
            return {status:false,data:'类型已经存在'}
        }
        console.log(checkRes,'checkRes')
        param.create_time = new Date();
        param.update_time = new Date();
        // console.log(param,"这里是参数")
        let res = await this.articleTypeRepository.save(param);
        // console.log(res);
        return {status:true,data:res};   
    }

}