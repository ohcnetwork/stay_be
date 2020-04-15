import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/CreateBookingDto.dto';
import { User } from 'src/auth/entities/User.entity';
import { Booking } from './entities/Booking.entity';

@Injectable()
export class BookingService {
    private logger = new Logger('Booking Service');

    constructor(
        @InjectRepository(BookingRepository)
        private readonly bookingRepository: BookingRepository
    ){}

    async getAllBooking(req: any): Promise<any> {
        return this.bookingRepository.getAllBooking();
    }

    async createBooking(createbookingDto: CreateBookingDto,
        user: User,
        ){
        return this.bookingRepository.createBooking(createbookingDto,user);        

    }

    async getBookings(
        req: any,
        user: User,
      ): Promise<Booking[]> {
        return this.bookingRepository.getBookings(user);
      }

      async deletebooking(
        book_id: number,
        user: User,
      ): Promise<void> {
        const result = await this.bookingRepository.delete(book_id);
    
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID "${book_id}" not found`);
        }
      }


}
