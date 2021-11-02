/*
https://docs.nestjs.com/modules
*/

import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { DeptEntity } from 'src/entity/dept.entity'
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
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn:'20s'}
        }),
        TypeOrmModule.forFeature([UserEntity,DeptEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService,LocalStrategy,JwtStrategy],
    exports: [AuthService]
})


export class AuthModule { }
