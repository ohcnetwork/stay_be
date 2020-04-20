import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
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


    async validateUser(user:User): Promise<any> {
      const found = await this.userRepository.findOne({id:user.id})
      console.log(found.type)
      if(found.type === 'facilityowner'){
          return found
      }
      else {
          throw new UnauthorizedException;
      }
  }

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
      async getHotelBookingDetails(user:User,hotelId:number): Promise<any> {
        if(await this.validateUser(user)) {
        const [book,count] = await this.bookingRepository.findAndCount({hotelId:hotelId});
        var list = []
        for(var i=0;i<count;i++){
          if (book[i].statusBooking != "CANCELLED")
          {
         const user = await this.userRepository.findOne({id:book[i].userId})
         const room = await this.roomRepository.findOne({id:book[i].roomId})
         list[i]={name:user.name,
          email:user.email,
          category:room.category,
          checkinDate:book[i].checkin,
          bookingDate:book[i].createdAt,
          statusCheckin:book[i].statusCheckin,
          bookingId:book[i].book_id}
         }
        }
        return { data:list,}
        
      }}


      async getUserBookingDetails(user:User): Promise<any> {
        console.log(user);
        const [book,count] = await this.bookingRepository.findAndCount({userId:user.id});
        var list = []
        for(var i=0;i<count;i++){
            if (book[i].statusBooking === "BOOKED")
         {
         const hotel = await this.facilityRepository.findOne({hotelId:book[i].hotelId})
         
         const room = await this.roomRepository.findOne({id:book[i].roomId})
         list[i]={name:hotel.name,
          address:hotel.address,
          district:hotel.district,
          category:room.category,
          cost:room.cost,
          checkinDate:book[i].checkin,
          checkoutDate:book[i].checkout,
          bookingDate:book[i].createdAt,
          bookingId:book[i].book_id,
        statusCheckin:book[i].statusCheckin}
        }
        }
        
          
        
       return{ data:list}
      }

      async checkInUser(id:number): Promise<any> {
        console.log(id)
        const booking = await this.bookingRepository.findOne({book_id:id})
        booking.statusCheckin = "CHECKEDIN";
        this.bookingRepository.save(booking);
      }

      async checkOutUser(id:number): Promise<any> {
        console.log(id)
        const booking = await this.bookingRepository.findOne({book_id:id})
        booking.statusCheckin = "CHECKOUT";
        this.bookingRepository.save(booking);
      }

}
