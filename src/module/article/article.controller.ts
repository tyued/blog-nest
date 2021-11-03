/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { CreateArticleTypeDto } from './dto/create.articleType.dto';

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

}
