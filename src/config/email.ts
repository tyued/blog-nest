// 邮件发送配置文件
import { resolve,join } from 'path'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
// console.log(resolve(__dirname,'../templates'),'66666');

export default{
    transport:{
        host:'smtp.qq.com',
        port: 587,
        ignoreTLS: true,
        secure: false,
        auth:{
            user: 'rayj0717@vip.qq.com',
            pass: 'zkhsxleefvxzbiei'       // 这里的密码不是QQ邮箱密码，而是授权码
        },
    },
    defaults:{
        from:'"姜璀" <rayj0717@vip.qq.com>',
    },
    preview:false,
    // 模板适配器
    template:{
        // 指定模板目录 然后在service里指定模板文件*.pug 这里用的是pug模板语言
        dir: resolve(__dirname,'../templates'),
        adapter: new PugAdapter(),
        options:{
            strict: true,
        }
    }
}