import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/CreateBookingDto.dto';
import { User } from 'src/auth/entities/User.entity';
import { Booking } from './entities/Booking.entity';
import { FacilityRepository } from 'src/facility/facility.repository';
import { RoomRepository } from 'src/rooms/room.repository';
import { UserRepository } from 'src/auth/user.repository';


@Injectable()
export class BookingService {
    private logger = new Logger('Booking Service');

    constructor(

      @InjectRepository(FacilityRepository)
      @InjectRepository(RoomRepository)
      @InjectRepository(UserRepository)
     @InjectRepository(BookingRepository)
        private readonly facilityRepository:FacilityRepository,
        private readonly roomRepository:RoomRepository,
        private readonly userRepository:UserRepository,
        @InjectRepository(BookingRepository)
        private readonly bookingRepository: BookingRepository
    ){}

    async getAllBooking(req: any): Promise<any> {
        return this.bookingRepository.getAllBooking();
    }

    async createBooking(
        userid: number,
        roomid: number,
        hotelid:number,
        createbookingDto: CreateBookingDto,
        ): Promise<any>{
        return this.bookingRepository.createBooking(userid,roomid,hotelid,createbookingDto);        

    }


      async deletebooking(
        book_id: number,
      ): Promise<void> {
        const result = await this.bookingRepository.delete(book_id);
    
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID "${book_id}" not found`);
        }
      }
      async getHotelBookingDetails(hotelId:number): Promise<any> {
        const [hotel,count] = await this.bookingRepository.findAndCount({hotelId:hotelId});
        var list = []
        for(var i=0;i<count;i++){
         const user = await this.userRepository.findOne({id:hotel[i].userId})
         const room = await this.roomRepository.findOne({id:hotel[i].roomId})
         list[i]={name:user.name,
          email:user.email,
          category:room.category,
          checkinDate:hotel[i].checkin,
          bookingDate:hotel[i].createdAt,
          bookingId:hotel[i].book_id}
        }
        return { data:list,}
        
      }
      async getUserBookingDetails(userId:number): Promise<any> {
        const [user,count] = await this.bookingRepository.findAndCount({userId:userId});
        var list = []
        for(var i=0;i<count;i++){
         const hotel = await this.facilityRepository.findOne({hotelId:user[i].hotelId})
         const room = await this.roomRepository.findOne({id:user[i].roomId})
         list[i]={name:hotel.name,
          address:hotel.address,
          district:hotel.district,
          category:room.category,
          cost:room.cost,
          checkinDate:user[i].checkin,
          checkoutDate:user[i].checkout,
          bookingDate:user[i].createdAt,
          bookingId:user[i].book_id}
        }
        
          
        
       return{ data:list}
      }


}
