// import { Strategy } from 'passport-local';
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    
    constructor(private readonly authService:AuthService){
        super();
    }
    async validate(username: string, password: string):Promise<any>{
        // AuthGuard('local')守卫通过后的返回对象
        // 目前是直接放行
        return {username,password}
        
        // 或者是去通过 authService里的验证方法确定用户名密码的匹配再返回
        const user = await this.authService.validateUser(username,password);
        if(!user){
            throw new HttpException({
                message: '用户名密码错误',
                error: 'please try again later.'
            },HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}