import { Repository, EntityRepository, QueryBuilder, getRepository } from "typeorm";
import { Booking } from "./entities/Booking.entity";
import { User } from "src/auth/entities/User.entity";
import { CreateBookingDto } from "./dto/CreateBookingDto.dto";
import { Logger, InternalServerErrorException, UnauthorizedException, NotFoundException, HttpException, HttpStatus } from "@nestjs/common";
import { RoomRepository } from '../rooms/room.repository';
import { BookingService } from "./booking.service";
import { Room } from "src/rooms/entity/room.entity";
import { GuestDetail } from "./entities/GuestDetail.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { UserRepository } from "src/auth/user.repository";
import { getDefaultSettings } from "http2";


@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
    
    
    async getAllBooking(): Promise<Booking[]>{
        const query = this.createQueryBuilder('bookings'); 
         query.innerJoinAndSelect('bookings.guestdetail','guestdetail')
        return await query.getMany();
    }

    async createBooking(
        user: User,
        createbookingDto: CreateBookingDto,
        roomRepository:RoomRepository,
        mailerService: MailerService,
        userRepository:UserRepository,
        ): Promise<any>{

        const { roomid,checkin,checkout ,guestdetails} = createbookingDto;
     
     
        
          
        const query = this.createQueryBuilder('bookings');
          
        query.innerJoin('bookings.room','room')
                .innerJoin('room.facility','facility')
                .select(['bookings.checkin','bookings.statusBooking','bookings.checkout','room.id','bookings.statusCheckin','room.beds'])
                .where('(room.id = :id)AND (bookings.statusBooking != :Cancelled) AND (bookings.statusCheckin != :Checkout) AND ((bookings.checkin <= :checkin AND checkout >= :checkout) OR (checkin < :checkin  AND checkout >= :checkout) OR (checkin >= :checkin AND checkout <= :checkout) OR (checkin >= :checkin AND checkin <= :checkout) OR ( checkin  <= :checkin AND (checkout >= :checkin AND checkout <= :checkout)))',{id:roomid,Cancelled:"CANCELLED",Checkout:"CHECKEDOUT",checkin,checkout})
                
              const query1 =   await query.getOne();
                
            
       // const found = await bookingRepository.findOne({room.id:roomid})
        if (!query1)
        {
            if(guestdetails.length != 0  ) {

            
             

               const date1 =new Date(checkout)
               const date2 =new Date(checkin)

               const currentdate = new Date();
               const year = currentdate.getFullYear();
               const month = currentdate.getMonth()+1;
               const day = currentdate.getDate();
               const today = year + "-" + month + "-" +day;
              const futureyear = year+2;

              const monthcheckin = date2.getMonth()+1;
              const daycheckin = date2.getDate();
              const yearcheckin = date2.getFullYear();
              const checkindate = yearcheckin + "-" + monthcheckin + "-" +daycheckin;

               const future = futureyear+ "-" +month + "-" + day;
              

              const monthcheckout = date1.getMonth()+1;
              const daycheckout = date1.getDate();
              const yearcheckout = date1.getFullYear();
              const checkoutdate = yearcheckout + "-" + monthcheckout + "-" +daycheckout;
               
               
            
             
               // console.log(checkout.valueOf()-checkin.valueOf())
                if(((+date1-+date2)/(1000 * 3600 * 24)) >= 6) 
                {
                  
                  if ((new Date(checkindate) >= new Date(today)) && (new Date(checkindate) <= new Date(future)) && (new Date(checkoutdate) <= new Date(future)))
                  {
                    
                    
                        const booking = new Booking();
                        booking.checkin = checkin;
                        booking.checkout = checkout;
                        booking.user =user;
                        const room = await roomRepository.findOne(roomid);
                        booking.room = room;
       
   // booking.hotelId=room.hotelId;
                        await booking.save();

                        for (var i=0;i<guestdetails.length;i++)
                         {
                            const guestdetail = new GuestDetail();
                            guestdetail.name = guestdetails[i].name;
                            guestdetail.age = guestdetails[i].age;
                            guestdetail.gender = guestdetails[i].gender;
                            guestdetail.number = guestdetails[i].number;
                            guestdetail.booking = booking;
                            await guestdetail.save();
           
                        }
                      const bookid  = booking.book_id
                    
                      
        //const data = {userid:userId, roomid:roomId,}
        const query = this.createQueryBuilder('bookings');
        query.innerJoin('bookings.user','user')
             .innerJoin('bookings.room','room')
             .innerJoin('room.facility','facility')
             .innerJoin('bookings.guestdetail','guestdetail')
             .select(['bookings.book_id','bookings.checkin','bookings.checkout','bookings.statusBooking','bookings.statusCheckin','user.name','facility.ownerID',
                    'bookings.createdAt','bookings.updatedAt', 'room.category','room.cost','facility.name','facility.address','facility.district','guestdetail.name','guestdetail.age','guestdetail.gender','guestdetail.number','facility.contact'])
             .where('bookings.book_id = :id', {id:bookid});
           

             const querybook = await query.getOne();

            


           var ownerid = Number(querybook.room.facility.ownerID);

           
           const owner = await userRepository.findOne(ownerid)
           
                        

                       // console.log(querybook.facility.address);
                   // return booking;
                    
                   return await mailerService.sendMail({
                        to: user.email.toLowerCase(),
                        from: process.env.FROM,
                        subject: 'Booking confirmed!',
                        template: 'booking_confirmation',
                        context: {
                          //email: user.email,
                          userName: querybook.user.name,
                          numberOfGuests: guestdetails.length,
                          hotelName: querybook.room.facility.name,
                          address: querybook.room.facility.address,
                          checkin: checkindate,
                          checkout: checkoutdate,
                          book_id: querybook.book_id,
                          type: querybook.room.category,
                          phone:querybook.room.facility.contact,
                          guestdetail:guestdetails
                            

                        }



                      } )
                      
                      .then(
                          
                        async () => {
                           return await mailerService.sendMail({
                                to: owner.email.toLowerCase(),
                                from: process.env.FROM,
                                subject: 'new booking!',
                                template: 'booking_confirmationhotel',
                                context: {
                                  //email: user.email,
                                  ownerName:owner.name,
                                  userName: querybook.user.name,
                                  numberOfGuests: guestdetails.length,
                                  type: querybook.room.category,
                                  guestdetail:querybook.guestdetail,
                                  checkin: checkindate,
                                  checkout: checkoutdate,
                                 
                                    
        
                                }
        
                              }) .then( async ()=>{
                                return {
                                    success:true,
                                    message:"mail send",
                                      data: querybook
                                };

                              })
                            
                          
                        }).catch(() => {
                            return {
                              success: false,
                              message: 'Something went wrong...!'
                            };
                          });
                    
                        
                        
  
                        }
                      
          else{
            throw new HttpException({detail:"Booking is not available for entered dates"},HttpStatus.NOT_FOUND)
          }
        
                      }
          
        else{
          throw new HttpException({detail:"7 days quarantine is compulsory"},HttpStatus.NOT_FOUND)
        }
                 }
                    
        else {
          throw new HttpException({detail:"Enter details"},HttpStatus.NOT_FOUND)
        }
        }
        else {
          throw new HttpException({detail:"Room not available"},HttpStatus.NOT_FOUND)
        }

    
    }

    async getUserBookingDetails(user:User): Promise<any>{
        const query = this.createQueryBuilder('bookings');
        query.innerJoin('bookings.user','user')
             .innerJoin('bookings.room','room')
             .innerJoin('room.facility','facility')
             .innerJoin('bookings.guestdetail','guestdetail')
             .select(['bookings.book_id','bookings.checkin','bookings.checkout','bookings.statusBooking','bookings.statusCheckin',
                    'bookings.createdAt','bookings.updatedAt', 'room.category','facility.photos','room.cost','facility.name','facility.address','facility.district','guestdetail.name','guestdetail.age','guestdetail.gender','guestdetail.number'])
             .where('user.id = :id', {id:user.id});
            var final=[]

             if(await query.getCount()>0){

              // return await query.getMany();
              const result =await  query.getMany();
              for(const  i in result)
              {
                for(const j in result[i].room.facility.photos)
                {
                  if(!result[i].room.facility.photos[j].includes('/'))
                      result[i].room.facility.photos[j] = `https://${process.env.CDN_URL}/${result[i].room.facility.photos[j]}`;
                }
                final.push(result[i])
              }
                return final;
            }
                else{
                    throw new NotFoundException({detail:"No Bookings"})
                }

    }

    async getHotelBookingDetails(user:User,hotelId:number): Promise<any> {
        const query = this.createQueryBuilder('bookings');
        query.innerJoin('bookings.user','user')
             .innerJoin('bookings.room','room')
             .innerJoin('room.facility','facility')
             .innerJoin('bookings.guestdetail','guestdetail')
             .select(['bookings.book_id','bookings.checkin','bookings.checkout','bookings.statusBooking','bookings.statusCheckin','bookings.roomNumber',
                    'bookings.createdAt','bookings.updatedAt', 'room.category','room.cost','room.title','user.name','user.email','guestdetail.name','guestdetail.age','guestdetail.gender','guestdetail.number'])
             .where('facility.id = :id', {id:hotelId});

             if(await query.getCount()>0){

                return await query.getMany();
                }
                else{
                    throw new NotFoundException({detail:"No Bookings"})
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
                    if(data.status==="CHECKEDIN"){
                        book.roomNumber=data.roomNumber;
                    }
                    book.save()
                    return {
                    status:true,
                    message:"Status Changed",
                    data:book
                  }}
                  else {
                     throw new HttpException ( {detail:"Booking was cancelled!"},HttpStatus.NOT_ACCEPTABLE);
                  }

            }
                
            }
        }

    
}
