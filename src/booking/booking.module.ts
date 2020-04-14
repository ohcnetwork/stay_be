import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/Booking.entity';
import { BookingRepository } from './booking.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([Booking, BookingRepository]),
  ],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
