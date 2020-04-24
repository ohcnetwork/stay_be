import { Repository, EntityRepository } from "typeorm";
import { Booking } from "./entities/Booking.entity";
import { User } from "src/auth/entities/User.entity";
import { CreateBookingDto } from "./dto/CreateBookingDto.dto";
import { Logger, InternalServerErrorException, UnauthorizedException, NotFoundException, HttpException, HttpStatus } from "@nestjs/common";
import { RoomRepository } from '../rooms/room.repository';
import { BookingService } from "./booking.service";
import { Room } from "src/rooms/entity/room.entity";

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

        const query = this.createQueryBuilder('bookings');
            
        query.innerJoin('bookings.room','room')
                .innerJoin('room.facility','facility')
                .select(['bookings.checkin','bookings.statusBooking','bookings.checkout','room.id','bookings.statusCheckin'])
                .where('(room.id = :id) AND (bookings.statusCheckin != :Checkout) AND (bookings.statusBooking != :Cancelled) AND ((bookings.checkin <= :checkin AND checkout >= :checkout) OR (checkin < :checkin  AND checkout >= :checkout) OR (checkin >= :checkin AND checkout <= :checkout) OR (checkin >= :checkin AND checkin <= :checkout) OR ( checkin  <= :checkin AND (checkout >= :checkin AND checkout <= :checkout)))',{id:roomid,Cancelled:"CANCELLED",Checkout:"CHECKEDOUT",checkin,checkout})           
              const query1 =   await query.getOne();

       // const found = await bookingRepository.findOne({room.id:roomid})
        if (!query1)
        {
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
        else {
            throw new NotFoundException("room not available")
        }

    
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

    async checkInOutUser(
        user: User,
        id:number,data:any,bookingRepository:BookingRepository,
        ): Promise<any>{
            const query = this.createQueryBuilder('bookings');
            query.innerJoin('bookings.user','user')
                .innerJoin('bookings.room','room')
                .innerJoin('room.facility','facility')
                .select(['user.type','facility.ownerID','user.id','bookings.statusCheckin'])
                .where('bookings.book_id = :id and facility.ownerID = :userid', {id:id,userid:user.id})
              const query1 =   await query.getOne();
               // .andWhere('user.id = facility.id')
                

                console.log (query1)

            if (!query1)
            {
                throw new UnauthorizedException;
            }
            else{
                
                if(["PENDING","CHECKEDIN","CHECKEDOUT"].includes(data.status))
                {
                    const book = await bookingRepository.findOne({book_id:id})
                    if (book.statusBooking === "BOOKED") {
                    book.statusCheckin=data.status;
                    book.save()
                    return {
                    status:true,
                    message:"Status Changed",
                  }}
                  else {
                     throw new HttpException ( "Booking was cancelled!",HttpStatus.NOT_ACCEPTABLE);
                  }

            }
                
            }
        }

    
}
