
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



export interface JwtPayload {
    sub : string | number,
    email : string
}

@Injectable()
    
export class JwtStrategy extends PassportStrategy(Strategy , 'jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET')!,
        });
    }
    async validate(payload: JwtPayload) {
        return { userId: payload.sub, email: payload.email };
    }
}
