/*
https://docs.nestjs.com/modules
*/

import { CacheModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [CacheModule.register()],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
