/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AuthService {
    constructor(private readonly mailerService:MailerService){}

    getCode(param): string{

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

        // console.log(param)
        return 'OK'
    }

}
