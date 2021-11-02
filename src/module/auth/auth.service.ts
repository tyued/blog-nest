/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'
import { RedisInstance } from 'src/database/redis';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { getRepository, Repository } from 'typeorm';
import { DeptEntity } from 'src/entity/dept.entity';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private readonly mailerService:MailerService,
        private readonly jwtService:JwtService,
        @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>    
    ){}

    /**
     * 根据邮箱地址获取随机验证码
     * 发送邮件到指定邮箱
     * 并把它已tempCode:xxx@qq.com 为key存入redis,定时300秒
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
        await redis.setex('tempCode:'+param.email, 300, code);
        // console.log(param)
        return 'OK'
    }

    /**
     * 创建用户
     * @param param 
     * @returns 
     */
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

    /**
     * 根据ID获取用户信息
     * @param id 
     * @returns 
     */
    async getOne(id){
        // let res = await this.userRepository.findOne({
        //     select:['id','user_name','user_phone','user_sex','user_avatar'], 
        //     relations:['dept_id'],
        //     where:[{'id':id}], 
        // });
        let res = await this.userRepository.createQueryBuilder()
            .leftJoinAndSelect(DeptEntity,'deptInfo','deptId = deptInfo.id')
            .select(`email,user_name,user_phone,user_avatar,user_sex,user_profile,
                    deptInfo.name as dept_name
            `)
            .where({'id':id})
            // .getSql();
            .getRawOne();
        return res;
    }

    // async getPersonListByDept(){
    //     let res = await getRepository(DeptEntity).createQueryBuilder('dept')
    //     .leftJoinAndSelect(UserEntity,'userInfo','userInfo.deptId = dept.id')
    //     .getRawMany();
    //     return res
    // }

    /**
     * 验证用户名密码
     * @param username  
     * @param password 
     * @returns 
     */
    async validateUser(username: string, password: string): Promise<any> {
        console.log(username,password,'这里是参数')
        let res = await this.userRepository.findOne({where:{'user_name':username,'user_password':password}})
        // .createQueryBuilder().where({'user_name':username,'user_password':password}).getSql();
        // findOne({where:{'user_name':username,'user_password':password}})
        // console.log(res,'res')
        if(!res){
            return {status:false,data:'用户名密码错误'}
        }else{
            return this.login(username);
        }
        return 
    }

    /**
     * 生成token,保持进redis 并返回token给前端
     * @param username 
     * @returns 
     */
    async login(username: string): Promise<any> {
        const loginObj = {username: username}
        const token = this.jwtService.sign(loginObj)
        const redis = await RedisInstance.initRedis('getCode',0);
        await redis.setex('tempCode:'+username, 600, token);
        return {
            status: true,
            access_token: token
        }
    }

    /**
     * 匹配验证码是否正确，返回true or false;
     * @param Param 
     * @returns 
     */
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
