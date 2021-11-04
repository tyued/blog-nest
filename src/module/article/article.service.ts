/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entity/article.entity';
import { ArticleTypeEntity } from 'src/entity/articleType.entity';
import { DeptEntity } from 'src/entity/dept.entity';
import { UserEntity } from 'src/entity/user.entity';
import { resList } from 'src/format/resList';
import { Any, Like, Repository } from 'typeorm';

@Injectable()
export class ArticleService { 
    constructor(
        @InjectRepository(ArticleTypeEntity) private readonly articleTypeRepository:Repository<ArticleTypeEntity>,
        @InjectRepository(ArticleEntity) private readonly articleRepository:Repository<ArticleEntity>
    ){}

    /**
     * 保存文章类型(新增和修改)
     * @param param 
     * @returns 
     */
    async createArticleType(param){
        /**
         * 修改类型
         */
        if(param.id){
            let checkRes = await this.articleTypeRepository.findOne({id:param.id});
            if(!checkRes){
                return {status:false,data:'无此类型'}
            }
            let upDateRes = await this.articleTypeRepository.update(checkRes,{typeName:param.typeName,update_time:new Date()});
            return {status:true,data:'记录更新完成'}
        }
        
        /**
         * 创建新类型
         */
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

    /**
     * 保存文章内容(新增和修改)
     * @param param 
     */
    async saveArticle(param){
        /**
         * 修改编辑
         */
        if(param.id){
            let checkRes = await this.articleRepository.findOne({id:param.id});
            if(!checkRes){
                return {status:false,data:'文章编号错误'}
            }
            param.update_time = new Date();
            let upDateRes = await this.articleRepository.update(checkRes,param);
            return {status:true,data:'记录更新完成'}
        }

        /**
         * 新增保存
         */
        param.create_time = new Date();
        param.update_time = new Date();
        let res = await this.articleRepository.save(param);
        return {status:true,data:res};
    }

    /**
     * 根据ID获取具体文章详情
     * @param id 
     */
    async getArticle(id){
        let res = await this.articleRepository.createQueryBuilder('article')
            .leftJoinAndSelect(UserEntity,'userInfo','authId = userInfo.id')
            .leftJoinAndSelect(ArticleTypeEntity,'typeInfo','articleTypeId = typeInfo.id')
            .select(`
                article.id as id,
                title,authId,subTitle,content,views,praise,
                article.create_time as create_time,
                article.update_time as update_time,
                userInfo.id as userid, user_name, user_sex, user_avatar,
                typeInfo.id as typeid,
                typeInfo.typeName as typename
            `)
            .where({'id':id})
            .getRawOne();
        return res;
    }

    /**
     * 获取文章列表
     * @param param 
     * @returns 
     */
    async getArticleList(param){
        let pageLimit = param.limit||5;
        let midSql = this.articleRepository.createQueryBuilder('article')
            .leftJoinAndSelect(UserEntity,'userInfo','authId = userInfo.id')
            .leftJoinAndSelect(ArticleTypeEntity,'typeInfo','articleTypeId = typeInfo.id')
            .skip((parseInt(param.page)-1)*parseInt(pageLimit))
            .take(parseInt(pageLimit))
            .orderBy('article.create_time','DESC')
        if(param.keyword){
            midSql.where("title like :title", {title: '%' + param.keyword + '%' })
        }
        let res = await midSql.getManyAndCount()
        let result = {} as resList
        result.list = res[0];
        result.page = parseInt(param.page);
        result.limit = parseInt(pageLimit);
        result.count = res[1];
        return result
    }


}