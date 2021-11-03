/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entity/article.entity';
import { ArticleTypeEntity } from 'src/entity/articleType.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity,ArticleTypeEntity])
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule { }
