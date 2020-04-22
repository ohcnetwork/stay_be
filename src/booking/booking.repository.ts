import { Repository, EntityRepository } from "typeorm";
import { Booking } from "./entities/Booking.entity";
import { User } from "src/auth/entities/User.entity";
import { CreateBookingDto } from "./dto/CreateBookingDto.dto";
import { Logger, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { RoomRepository } from '../rooms/room.repository';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
    
    
    async getAllBooking(): Promise<Booking[]>{
        const query = this.createQueryBuilder('bookings'); 
        return await query.getMany();
    }

    async createBooking(
        user: User,
        createbookingDto: CreateBookingDto,
        roomRepository:RoomRepository,
        ): Promise<any>{
        const { roomid,checkin,checkout } = createbookingDto;
            console.log(user)
       // const found = await bookingRepository.findOne({room.id:roomid})

        const booking = new Booking();
        booking.checkin = checkin;
        booking.checkout = checkout;
        booking.user =user;
        const room = await roomRepository.findOne(roomid);
        booking.room = room;
       
   // booking.hotelId=room.hotelId;
        await booking.save();

        //const data = {userid:userId, roomid:roomId,}

    
        return booking;


    
    }

    async getUserBookingDetails(user:User): Promise<any>{
        const query = this.createQueryBuilder('bookings');
        query.innerJoin('bookings.user','user')
             .innerJoin('bookings.room','room')
             .innerJoin('room.facility','facility')
             .select(['bookings.book_id','bookings.checkin','bookings.checkout','bookings.statusBooking','bookings.statusCheckin',
                    'bookings.createdAt','bookings.updatedAt', 'room.category','room.cost','facility.name','facility.address','facility.district'])
             .where('user.id = :id', {id:user.id});
        if(await query.getCount()>0){

        return await query.getMany();
        }
        else{
            throw new NotFoundException("No Bookings")
        }
    }

    async getHotelBookingDetails(user:User,hotelId:number): Promise<any> {
        const query = this.createQueryBuilder('bookings');
        query.innerJoin('bookings.user','user')
             .innerJoin('bookings.room','room')
             .innerJoin('room.facility','facility')
             .select(['bookings.book_id','bookings.checkin','bookings.checkout','bookings.statusBooking','bookings.statusCheckin',
                    'bookings.createdAt','bookings.updatedAt', 'room.category','room.cost','user.name','user.email'])
             .where('facility.id = :id', {id:hotelId});

             if(await query.getCount()>0){

                return await query.getMany();
                }
                else{
                    throw new NotFoundException("No Bookings")
                }

    }

    
}