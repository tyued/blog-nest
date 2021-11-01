/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, CACHE_MANAGER, Post, Query, Inject, Param } from '@nestjs/common';
import { RedisInstance } from 'src/database/redis';
import { UserEntity } from 'src/entity/user.entity';
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
    
    /**
     * 根据邮箱地址获取随机验证码
     * @param param {email}
     */
    @Post('getCode')
    getCode(@Body() param:CreateCodeDto){
        this.authService.getCode(param);
    }

    /**
     * 匹配邮箱和验证码,是否验证通过
     * @param param {email,code}
     */
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

    /**
     * 设置用户名和密码,创建新用户
     * @param param {email,username,password,repassword}
     * @returns 
     */
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

    /**
     * 根据用户id获取用户的具体信息
     * @param param0 id
     * @returns 
     */
    @Get('get')
    async getOne(@Query() {id} ): Promise<UserEntity> {
        if(!id){
            throw new HttpException(
                {status: HttpStatus.BAD_REQUEST, message:'请求必须传入参数 id',error:'id is required'},
                HttpStatus.BAD_REQUEST,
            );
        }
        return await this.authService.getOne(id);
    }

    @Post('login')
    async login(@Body() param){
        // this.authService.login(param)
        console.log(param);
        return '3123123'
    }

    /**
     * 测试测试。。。。。(*￣0￣)
     * @returns 
     */
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
