import { Repository, EntityRepository } from "typeorm";
import { Booking } from "./entities/Booking.entity";
import { User } from "src/auth/entities/User.entity";
import { CreateBookingDto } from "./dto/CreateBookingDto.dto";
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
    
    
    async getAllBooking(): Promise<Booking[]>{
        const query = this.createQueryBuilder('booking');
        return await query.getMany();
    }

    async createBooking(
      userid: number,
      roomid: number,
      hotelid: number,
      createbookingDto: CreateBookingDto,
      ): Promise<any>{
      const { checkin,checkout } = createbookingDto;

      const booking = new Booking();
      booking.checkin = checkin;
      booking.checkout = checkout;
      booking.userId =userid;
      booking.roomId = roomid;
      booking.hotelId = hotelid;
      await booking.save();
      

      //const data = {userid:userId, roomid:roomId,}

  
      return booking;
    
    }



    async getBookings(
      userid: number,
      ): Promise<Booking[]> {
        const query = this.createQueryBuilder('booking');
    
        query.where('booking.userId = :userId', { userId: userid });

        try {
          const bookings = await query.getMany();
          return bookings;
        } catch (error) {
          //this.logger.error(`Failed to get tasks for user`);
          throw new InternalServerErrorException();
        }
      }


      async getBookingsHotel(
        bookid: number,
        ): Promise<Booking[]> {
          const query = this.createQueryBuilder('booking');
      
          query.where('booking.bookId = :bookId', { userId: bookid });
  
          try {
            const bookings = await query.getMany();
            return bookings;
          } catch (error) {
            //this.logger.error(`Failed to get tasks for user`);
            throw new InternalServerErrorException();
          }
        }
    

}