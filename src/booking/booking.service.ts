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
        user:User,
        createbookingDto: CreateBookingDto,
        ): Promise<any>{
        return this.bookingRepository.createBooking(user,createbookingDto,this.roomRepository);        

    }


      async deletebooking(
        book_id: number,
      ): Promise<any> {
        const result = await this.bookingRepository.findOne(book_id);
    
        if(result) {
          result.statusBooking = "CANCELLED"
          await this.bookingRepository.save(result);
        }
        else {
          throw new NotFoundException(`Task with ID "${book_id}" not found`);
        }


        
      }
      async getHotelBookingDetails(hotelId:number): Promise<any> {
        const [hotel,count] = await this.bookingRepository.findAndCount({hotelId:hotelId});
        var list = []
        for(var i=0;i<count;i++){
          if (hotel[i].statusBooking != "CANCELLED")
          {
         const user = await this.userRepository.findOne({id:hotel[i].userId})
         const room = await this.roomRepository.findOne({id:hotel[i].roomId})
         list[i]={name:user.name,
          email:user.email,
          category:room.category,
          checkinDate:hotel[i].checkin,
          bookingDate:hotel[i].createdAt,
          bookingId:hotel[i].book_id}
         }
        }
        return { data:list,}
        
      }


      async getUserBookingDetails(user:User): Promise<any> {
        console.log(user);
        const [user1,count] = await this.bookingRepository.findAndCount({userId:user.id});
        var list = []
        for(var i=0;i<count;i++){
         const hotel = await this.facilityRepository.findOne({hotelId:user1[i].hotelId})
         if (hotel.status != "CANCELLED")
         {
         const room = await this.roomRepository.findOne({id:user1[i].roomId})
         list[i]={name:hotel.name,
          address:hotel.address,
          district:hotel.district,
          category:room.category,
          cost:room.cost,
          checkinDate:user1[i].checkin,
          checkoutDate:user1[i].checkout,
          bookingDate:user1[i].createdAt,
          bookingId:user1[i].book_id}
        }
        }
        
          
        
       return{ data:list}
      }


}
