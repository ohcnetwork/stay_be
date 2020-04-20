import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { FacilityRepository } from '../facility/facility.repository';
import { BookingRepository} from '../booking/booking.repository';
import { BookingRepository} from '../auth/user.repository';
import { BookingModule } from 'src/booking/booking.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([RoomRepository]),
    TypeOrmModule.forFeature([FacilityRepository]),
    TypeOrmModule.forFeature([BookingRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    BookingModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
