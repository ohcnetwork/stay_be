import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { AuthController } from './auth.controller';
import { LocalStrategy, JwtStrategy } from './strategy';
import {HandlebarsAdapter, MailerModule} from "@nestjs-modules/mailer";
import {nestMailer} from "../config/constants";

const jwtConfig = config.get('jwt');

@Module({
  imports:[
    TypeOrmModule.forFeature([User, UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT || jwtConfig.secret,
      signOptions: { expiresIn: '24h' },
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: nestMailer.transport,
        template: {
          dir: './templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          },
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
