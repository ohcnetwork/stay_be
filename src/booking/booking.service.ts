import { Injectable, Logger, NotFoundException, UnauthorizedException,HttpException, HttpStatus } from '@nestjs/common';
import {  QueryBuilder, createQueryBuilder, getConnection } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/CreateBookingDto.dto';
import { User } from 'src/auth/entities/User.entity';
import { Booking } from './entities/Booking.entity';
import { FacilityRepository } from 'src/facility/facility.repository';
import { RoomRepository } from 'src/rooms/room.repository';
import { UserRepository } from 'src/auth/user.repository';
import { QueryFailedError, LessThanOrEqual, MoreThanOrEqual, LessThan, Between } from 'typeorm';
import {MailerService} from "@nestjs-modules/mailer";

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
        private readonly mailerService: MailerService,
        @InjectRepository(BookingRepository)
        private readonly bookingRepository: BookingRepository
        
    ){}


    async validateUser(user:User,id:any): Promise<any> {
      const found = await this.userRepository.findOne({id:user.id})
      const hotel = await this.facilityRepository.findOne({id:id})
      //console.log(found.type,hotel.hotelId)
      if((found.type === 'facilityowner' && hotel.ownerID === found.id)||(found.type === 'admin')){
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
       //  const { roomid,checkin,checkout } = createbookingDto;
       // const found = await this.roomRepository.findOne({id:roomid})
      //  const booking = Booking;
       // if (found) {
      //    const book = await this.bookingRepository.find({
       //     where: [ 'booking.room = found && book.statusBooking === "BOOKED"]
       //   })
       // }
        


        /* const book = await this.bookingRepository.find({
            where: [
                {roomId:createbookingDto.roomid,checkin:LessThanOrEqual(createbookingDto.checkin) ,checkout:MoreThanOrEqual(createbookingDto.checkout)},
                {roomId:createbookingDto.roomid,checkin:LessThan(createbookingDto.checkin) ,checkout:MoreThanOrEqual(createbookingDto.checkout)},
                {roomId:createbookingDto.roomid,checkin:MoreThanOrEqual(createbookingDto.checkin) ,checkout:LessThanOrEqual(createbookingDto.checkout)},
                {roomId:createbookingDto.roomid,checkin:Between(createbookingDto.checkin,createbookingDto.checkout)},
                {roomId:createbookingDto.roomid,checkin:LessThanOrEqual(createbookingDto.checkin),checkout:Between(createbookingDto.checkin,createbookingDto.checkout)} ,                   

              ],
        });
        console.log(book)
        if(book.length === 0){
        return this.bookingRepository.createBooking(user,createbookingDto,this.roomRepository);        
        }
        else {
          throw new HttpException("Room already booked",HttpStatus.FORBIDDEN)
        }*/


        if(createbookingDto.checkin<createbookingDto.checkout){

        return this.bookingRepository.createBooking(user,createbookingDto,this.roomRepository,this.mailerService,this.userRepository);
        }
        else{
          throw new HttpException("Invalid date",HttpStatus.BAD_REQUEST)
        }
    }


      async deletebooking(
        book_id: number,
      ): Promise<any> {
        const result = await this.bookingRepository.findOne({book_id})
        if (result){
        result.statusBooking = "CANCELLED"
        await this.bookingRepository.save(result); 
      
        const book = await getConnection()
        .createQueryBuilder()
        .from(Booking,'bookings')
        .innerJoin('bookings.user','user')
             .innerJoin('bookings.room','room')
             .innerJoin('room.facility','facility')
             .select(['bookings.book_id','bookings.checkin','bookings.checkout','bookings.statusBooking','bookings.statusCheckin','user.name','user.email',
                    'bookings.createdAt','bookings.updatedAt', 'room.category','room.cost','facility.name','facility.address','facility.district','facility.contact'])
      
        .where('bookings.book_id = :id', {id:book_id})
        .getOne();
          

        return await this.mailerService.sendMail({
          to: book.user.email.toLowerCase(),
          from: process.env.FROM,
          subject: 'Booking cancellation',
          template: 'booking_cancellation',
          
                        context: {
                          //email: user.email,
                          userName: book.user.name,
                         
                          hotelName: book.room.facility.name,
                          address: book.room.facility.address,
                          checkin: book.checkin,
                          checkout: book.checkout,
                          book_id: book.book_id,
                          type: book.room.category,
                          phone:book.room.facility.contact
                            

                        }


                      })
                      
                      .then(async () => {
                          return {
                              success:true,
                              message:"booking cancelled",
                                
                          };
                        }).catch(() => {
                            return {
                              success: false,
                              message: 'Something went wrong...!'
                            };
                          });
                    
        
          
        }
        else {
          throw new NotFoundException(`Task with ID "${book_id}" not found`);
        }


        
      }
     /* async getHotelBookingDetails(user:User,hotelId:number): Promise<any> {
        if(await this.validateUser(user,hotelId)) {
        const [book,count] = await this.bookingRepository.findAndCount({hotelId:hotelId});
        var list = []
        for(var i=0;i<count;i++){
          if (book[i].statusBooking === "BOOKED")
          {
         const user = await this.userRepository.findOne({id:book[i].userId})
         const room = await this.roomRepository.findOne({id:book[i].roomId})
         console.log(user)
         list[i]={name:user.name,
          email:user.email,
          category:room.category,
          checkinDate:book[i].checkin,
          bookingDate:book[i].createdAt,
          statusBooking:book[i].statusBooking,
          statusCheckin:book[i].statusCheckin,
          bookingId:book[i].book_id}
         }
        }
        var filtered = list.filter(function (el) {
          return el != null;
        });
        return { data:filtered,}
        
      }}*/


      //get all booking details for given user
      async getHotelBookingDetails(user:User,hotelId:number): Promise<any> {
        if(await this.validateUser(user,hotelId)) {
          
        return this.bookingRepository.getHotelBookingDetails(user,hotelId);

        }
      

      }

      async getUserBookingDetails(user:User): Promise<any> {

        return this.bookingRepository.getUserBookingDetails(user);

      }




    /*  async getUserBookingDetails(user:User): Promise<any> {
        console.log(user);
        const [book,count] = await this.bookingRepository.findAndCount({userId:user.id});
        var list = []
        for(var i=0;i<count;i++){
        
         const hotel = await this.facilityRepository.findOne({hotelId:book[i].hotelId})
         
         const room = await this.roomRepository.findOne({id:book[i].roomId})
         
         console.log(hotel,room)
         list[i]={name:hotel.name,
          address:hotel.address,
          district:hotel.district,
          category:room.category,
          cost:room.cost,
          checkinDate:book[i].checkin,
          checkoutDate:book[i].checkout,
          bookingStatus:book[i].statusBooking,
          bookingDate:book[i].createdAt,
          bookingId:book[i].book_id,
          statusCheckin:book[i].statusCheckin}
        
        }
        
          
        
       return{ data:list}
      }*/

      

      async checkInOutUser(user:User,id:number,data:any): Promise<any> {
        return this.bookingRepository.checkInOutUser(user,id,data,this.bookingRepository);

        /*const book = await this.bookingRepository.findOne({book_id:id})
        if(await this.validateUser(user,book.room.facility.id)){
        if(["PENDING","CHECKEDIN","CHECKEDOUT"].includes(data.status))
          {
            
            book.statusCheckin=data.status;
            this.bookingRepository.save(book)
            return {
              status:true,
              message:"Status Changed",
            }
          }
          else{
            throw new HttpException("status not valid",HttpStatus.EXPECTATION_FAILED);
          }
        }*/
      }

}
