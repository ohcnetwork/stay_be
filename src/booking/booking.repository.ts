import { Repository, EntityRepository } from "typeorm";
import { Booking } from "./entities/Booking.entity";
import { User } from "src/auth/entities/User.entity";
import { CreateBookingDto } from "./dto/CreateBookingDto.dto";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { RoomRepository } from '../rooms/room.repository';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
    
    
    async getAllBooking(): Promise<Booking[]>{
        const query = await this.createQueryBuilder('bookings');
        
        return await query.getMany();
    }

    async createBooking(
        user: User,
        createbookingDto: CreateBookingDto,
        roomRepository:RoomRepository,
        ): Promise<any>{
        const { roomid,checkin,checkout } = createbookingDto;

        const booking = new Booking();
        booking.checkin = checkin;
        booking.checkout = checkout;
        booking.userId =user.id;
        booking.roomId = roomid;
        const room = await roomRepository.findOne(roomid);
        booking.hotelId=room.hotelId;
        await booking.save();

        //const data = {userid:userId, roomid:roomId,}

    
        return booking;


    
    }
    
}