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

    async createBooking(
      userid: number,
      roomid: number,
      hotelid: number,
      createbookingDto: CreateBookingDto,
      ): Promise<any>{
      return this.bookingRepository.createBooking(userid,roomid,hotelid,createbookingDto);        

  }

  async getBookings(
    userid: number,
 ): Promise<Booking[]> {
   return this.bookingRepository.getBookings(userid);
 }


 async getBookingsHotel(
  bookid: number,
): Promise<Booking[]> {
 return this.bookingRepository.getBookingsHotel(bookid);
}

      async deletebooking(
        book_id: number,
        userid: number,
      ): Promise<void> {
        const result = await this.bookingRepository.delete(book_id);
    
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID "${book_id}" not found`);
        }
      }


}
