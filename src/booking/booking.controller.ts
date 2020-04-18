import { Controller, Logger, UseGuards, Body, Post, Get, Request, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateBookingDto } from './dto/CreateBookingDto.dto';
import { User } from 'src/auth/entities/User.entity';
import { Booking } from './entities/Booking.entity';


@ApiUseTags('Booking')
@Controller('api/v1/booking')
//@UseGuards(AuthGuard('jwt'))
export class BookingController {
    private logger = new Logger ('Booking Controller');
    constructor (private readonly bookingService: BookingService) {}


    //get all bookings

    @Get("all-bookings")
    getAllBookings(@Request() req: any) {
        this.logger.verbose(`retrieving all bookings`);
        return this.bookingService.getAllBooking(req);
    }

    //post booking detail
    
    @Post('/:userId/:roomId/:hotelId')
    createBooking(
        @Param('userId') userid: number,
        @Param('roomId') roomid: number,
        @Param('hotelId') hotelid: number,
        @Body() createbookingDto: CreateBookingDto,
        ): Promise<any>{                          
        this.logger.verbose("booking created with  ");
        return this.bookingService.createBooking(userid,roomid,hotelid,createbookingDto); 
    }

    //get all bookings of user


    //cancelbooking
    @Delete('/:book_id')
    deleteTask(
        @Param('book_id', ParseIntPipe) book_id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.bookingService.deletebooking(book_id, user);
    }

    //get booking details
    @Get('/HotelDetails/:hotelId')
    getHotelBookingDetails(@Param('hotelId',ParseIntPipe) hotelId:number): Promise<any> {
        return this.bookingService.getHotelBookingDetails(hotelId);
    }
    @Get('/UserDetails/:userId')
    getUserBookingDetails(@Param('userId',ParseIntPipe) userId:number):Promise<any>{
        return this.bookingService.getUserBookingDetails(userId);
    }











}
