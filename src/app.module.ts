import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {DbConfig} from './config/db.config'
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { FacilityController } from './facility/facility.controller';
import { FacilityModule } from './facility/facility.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsController } from './rooms/rooms.controller';
import { BookingController } from './booking/booking.controller';
import { BookingModule } from './booking/booking.module';
import {HandlebarsAdapter, MailerModule} from '@nestjs-modules/mailer';
import {nestMailer} from "./config/constants";
import {DefaultAdminModule} from 'nestjs-admin';
@Module({
  imports: [
    AuthModule,
    FacilityModule,
    RoomsModule,
    BookingModule,
    TypeOrmModule.forRoot(DbConfig),
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
    DefaultAdminModule
  ],
  controllers: [AuthController,FacilityController,RoomsController, BookingController],
  providers: [],
})
export class AppModule {}

