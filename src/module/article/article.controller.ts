/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { CreateArticleTypeDto } from './dto/create.articleType.dto';
import { CreateArticleDto } from './dto/create.article.dto'

@UseGuards(AuthGuard('jwt'))
@Controller('article')
export class ArticleController { 
    constructor(private readonly articleService:ArticleService){}

    @Post('create')
    async createArticleType(@Body() param:CreateArticleTypeDto){
        let res = await this.articleService.createArticleType(param)

        if(res.status){
            return res.data
        }else{
            throw new HttpException({message:res.data},HttpStatus.BAD_REQUEST);
        }
    }

    @Post('saveArticle')
    async saveArticle(@Body() param:CreateArticleDto){
        let res = await this.articleService.saveArticle(param);

        if(res.status){
            return res.data
        }else{
            throw new HttpException({message:res.data},HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getArticle')
    async getArticle(@Query() {id}){
        if(!id){
            throw new HttpException({message:'参数不完整'},HttpStatus.BAD_REQUEST);
        }
        let res = await this.articleService.getArticle(id);
        return res
    }

    @Get('getArticleList')
    async getArticleList(@Query() param){
        // {keyword,typeid,page,limit}
        if(!param.page||param.page==0){
            throw new HttpException({message:'错误页码'},HttpStatus.BAD_REQUEST);
        }
        let res = await this.articleService.getArticleList(param);
        return res
    }

}
