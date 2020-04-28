import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/Booking.entity';
import { BookingRepository } from './booking.repository';
import { AuthModule } from 'src/auth/auth.module';
import { FacilityRepository } from '../facility/facility.repository';
import { UserRepository } from 'src/auth/user.repository';
import { RoomRepository } from 'src/rooms/room.repository';
import {HandlebarsAdapter, MailerModule} from "@nestjs-modules/mailer";
import {nestMailer} from "../config/constants";
@Module({
  imports:[
    TypeOrmModule.forFeature([Booking, BookingRepository]),
    TypeOrmModule.forFeature([FacilityRepository]),
    TypeOrmModule.forFeature([RoomRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
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
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
