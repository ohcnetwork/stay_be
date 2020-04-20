import { Controller, Logger, UseGuards, Body, Post, Get, Request, Delete, Param, ParseIntPipe, Req, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookingDto } from './dto/CreateBookingDto.dto';
import { ChangeStatusDto} from './dto/ChangeStatusDto.dto';


@ApiUseTags('Booking')
@Controller('api/v1/booking')
//@UseGuards(AuthGuard('jwt'))
export class BookingController {
    private logger = new Logger ('Booking Controller');
    constructor (private readonly bookingService: BookingService) {}


    //get all bookings
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get("all-bookings")
    getAllBookings(@Request() req: any) {
        this.logger.verbose(`retrieving all bookings`);
        return this.bookingService.getAllBooking(req);
    }

    //post booking detail
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/createBooking')
    createBooking(
        @Req() req: any,
        @Body() createbookingDto: CreateBookingDto,
        ): Promise<any>{                          
        this.logger.verbose("booking created with  ");
        return this.bookingService.createBooking(req.user,createbookingDto); 
    }

    //get all bookings of user


    //cancelbooking
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:book_id')
    deleteTask(
        @Param('book_id', ParseIntPipe) book_id: number,
    ): Promise<void> {
        return this.bookingService.deletebooking(book_id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    //get booking details
    @Get('/HotelDetails/:hotelId')
    getHotelBookingDetails(@Req() req:any,@Param('hotelId',ParseIntPipe) hotelId:number): Promise<any> {
        return this.bookingService.getHotelBookingDetails(req.user,hotelId);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('/UserDetails')
    getUserBookingDetails(@Req() req:any):Promise<any>{
        console.log(req.user);
        return this.bookingService.getUserBookingDetails(req.user);
        
    }


    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put('/checkin/:bookId1')
    checkInOutUser(@Param('bookId1',ParseIntPipe) bookId:number,@Body() body:ChangeStatusDto): Promise<any> {
        this.logger.verbose("user checked out")
        return this.bookingService.checkInOutUser(bookId,body);
    }










}
