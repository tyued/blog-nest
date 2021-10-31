import { AuthModule } from './module/auth/auth.module';

import { resolve } from 'path';
import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule,ConfigService} from 'nestjs-config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';

// import * as redisStore from 'cache-manager-redis-store'
// import { RedisModule,RedisService } from 'nestjs-redis';
// import redisConfig  from './config/redis';
// import { config } from 'rxjs';

// console.log(redisConfig,'redisConfig')

// let options={
//     port: 6379,
//     host: '127.0.0.1'
// }

@Module({
    imports: [
        // 读取config 下所有的ts,js文件
        ConfigModule.load(resolve(__dirname,'config','**/!(*.d).{ts,js}')),
        // 设置mailerModule的配置信息
        MailerModule.forRootAsync({
            useFactory: (config:ConfigService) => config.get('email'),
            inject: [ConfigService]
        }),
        TypeOrmModule.forRootAsync({
            useFactory:(config:ConfigService) => config.get('database'),
            inject: [ConfigService], 
        }),
        // 设置redis的配置信息
        // CacheModule.register(),
        // CacheModule.register({
        //     useFactory:(config:ConfigService) => ({
        //         redis: config.get('redis')
        //     }),
        //     inject: [ConfigService]
        // }),
        // RedisModule.register({
        //     name:'x',
        //     // imports: [ConfigModule],
        //     useFactory:(config:ConfigService) => ({
        //         redis: config.get('redis')
        //     }),
        //     inject: [ConfigService]
        // }),
        // RedisModule.register({
        //     port: 6379,
        //     host: '127.0.0.1',
        //     password: '',
        //     db: 0
        // }),
        AuthModule,],
    controllers: [AppController],
    providers: [AppService],
})

// let option = {
    
// }

export class AppModule {}
