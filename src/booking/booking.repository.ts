import { Repository, EntityRepository } from "typeorm";
import { Booking } from "./entities/Booking.entity";
import { User } from "src/auth/entities/User.entity";
import { CreateBookingDto } from "./dto/CreateBookingDto.dto";
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
    
    
    async getAllBooking(): Promise<Booking[]>{
        const query = this.createQueryBuilder('bookings');
        return await query.getMany();
    }

    async createBooking(
        userid: number,
        roomid: number,
        hotelid:number,
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
    
}