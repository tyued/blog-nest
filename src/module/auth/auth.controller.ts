/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController { 
    @Post('getCode')
    getCode(@Body() param){
        
    }
}
