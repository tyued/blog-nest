/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'
import { RedisInstance } from 'src/database/redis';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { DeptEntity } from 'src/entity/dept.entity';

@Injectable()
export class AuthService {
    constructor(private readonly mailerService:MailerService,
        @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>    
    ){}

    /**
     * 
     */
    async getCode(param): Promise<string>{
        // 产生6位数字的随机码
        const code = Math.random().toString().slice(-6);
        // console.log(param.email,code,'参数')
        this.mailerService.sendMail({
            to: param.email,
            from: 'rayj0717@vip.qq.com',
            subject: 'blog注册验证码',
            // text: '这里是文本内容',
            // 使用模板文件
            template:'./email',
            // html: '<b>欢迎使用NestJs</b>',
            // 模板接受的参数对象
            context:{
                username:'发件人：姜璀',
                code:code
            }
        }).then(()=>{
        }).catch(()=>{
            return 'Error'
        })

        // console.log('把验证码存入redis.');
        const redis = await RedisInstance.initRedis('getCode',0);
        await redis.setex('tempCode:'+param.email, 6000, code);
        // console.log(param)
        return 'OK'
    }

    async createUser(param){
        let findOne = await this.userRepository.findOne({user_name:param.username});
        // console.log(findOne,'findOne')
        if(findOne){
            return {status:false,data:'用户名已经被注册'}
        }

        let user = new UserEntity;
        user.email = param.email;
        user.user_name = param.username;
        user.user_password = param.password;
        user.create_time = new Date();
        user.update_tiem = new Date();
        let res = await this.userRepository.save(user);
        return {status:true,data:res};
    }

    async getOne(id){
        let res = await this.userRepository.findOne({where:{id:id}, relations:['deptInfo'],})
        return res;
    }

    async verifyCode(Param){
        // console.log('id=',Param);
        const redis = await RedisInstance.initRedis('verifyCode',0);
        const code = await redis.get('tempCode:'+Param.email);
        // console.log(code,'code',Param.code,'param.code')
        if(code===Param.code){
            return true;
        }else{
            return false;
        }
    }

}
