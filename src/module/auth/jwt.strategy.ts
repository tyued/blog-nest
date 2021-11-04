import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly jwtService:JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration: true,                    // 过期忽略
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        // console.log(payload,'payload')
        return {userId: payload.sub, username: payload.username};
    }
}
