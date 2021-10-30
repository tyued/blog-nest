/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, CACHE_MANAGER, Post, Query, Inject, Param } from '@nestjs/common';
import { Hash } from 'crypto';
import { from } from 'rxjs';
import { RedisInstance } from 'src/database/redis';
import { AuthService } from './auth.service';
import { CreateCodeDto } from './dto/create.code.dto';
// import { Cache } from 'cache-manager'

@Controller('auth')
export class AuthController { 
    constructor(
        private readonly authService:AuthService,
        // @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}

    @Post('getCode')
    getCode(@Body() param:CreateCodeDto){
        this.authService.getCode(param);
    }

    @Post('verifyCode')
    verifyCode(@Query() {id}){
        if(!id){
            throw new HttpException(
                {status:HttpStatus.BAD_REQUEST,message:'请输入验证码',error:'code is required.'},
                HttpStatus.BAD_REQUEST
            );
        }
        this.authService.verifyCode(id);
    }


    @Get('get')
    getOne(@Query() {id} ): string{
        if(!id){
            throw new HttpException(
                {status: HttpStatus.BAD_REQUEST, message:'请求必须传入参数 id',error:'id is required'},
                HttpStatus.BAD_REQUEST,
            );
        }
        return 'this.CatsService.getOne();'
    }

    @Post('setval')
    async setval(){
        const redis = await RedisInstance.initRedis('setvalFun',0);
        // setex 需要带过期时间 s秒
        // set 通用
        // hmset 哈希列表
        // sunionstore 并集并保留结果
        await redis.setex('tempCode:rayjcr',200,'6677');
        // await redis.set('tempCode', 'rayjcr');
        // await redis.hmset("hosts");
        return '666'
    }

}
