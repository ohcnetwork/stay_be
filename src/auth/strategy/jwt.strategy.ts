import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromBodyField('access_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT || jwtConfig.secret,
    });
  }

  async validate(payload: any) {
    const { id, email } = payload;
    return {
      id, email,
    };
  }
}
