/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, CACHE_MANAGER, Post, Query, Inject } from '@nestjs/common';
import { from } from 'rxjs';
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
        // const value = await this.cacheManager.get('rayjcr');

        // await this.cacheManager.set('rayjcr', '888888',{ ttl: 0 });
        // // await this
        // console.log(value,'set_value');
        return '666'
    }

}
