/*
https://docs.nestjs.com/modules
*/

import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { DeptEntity } from 'src/entity/dept.entity'
// import { RedisModule } from 'nestjs-redis'

// let options = {
//     port: 6379,
//     host: '127.0.0.1',
//     password: '',
//     db: 0
// }
// https://github.com/TimurRK/nestjs-example/blob/master/src/redis/redis.providers.ts
// 看这文章
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [AuthService],
})


export class AuthModule { }
