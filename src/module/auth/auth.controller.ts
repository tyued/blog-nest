/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, CACHE_MANAGER, Post, Query, Inject, Param } from '@nestjs/common';
import { Hash } from 'crypto';
import { from } from 'rxjs';
import { RedisInstance } from 'src/database/redis';
import { AuthService } from './auth.service';
import { CreateCodeDto } from './dto/create.code.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { verifyCode } from './dto/verify.code.dto';
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
    async verifyCode(@Body() param:verifyCode){
        // if(!id){
        //     throw new HttpException(
        //         {status:HttpStatus.BAD_REQUEST,message:'请输入验证码',error:'code is required.'},
        //         HttpStatus.BAD_REQUEST
        //     );
        // }
        let res = await this.authService.verifyCode(param);
        console.log(res,'res')
        if(!res){
            throw new HttpException(
                {status: HttpStatus.BAD_REQUEST, message:'验证码验证失败',error:'verifyCode is error'},
                HttpStatus.BAD_REQUEST,
            );
        }
    }



    @Post('create')
    async createUser(@Body() param:CreateUserDto){
        if(param.password!==param.repassword){
            throw new HttpException({message:'密码和二次密码不同.'},HttpStatus.BAD_REQUEST)
        }
        let res = await this.authService.createUser(param);
        if(res.status){
            return res.data
        }else{
            throw new HttpException({message:res.data},HttpStatus.BAD_REQUEST);
        }
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
