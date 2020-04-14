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
@UseGuards(AuthGuard())
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
    
    @Post('bookoption')
    createBooking(
        @Body() createbookingDto: CreateBookingDto,
        @GetUser() user:User,
        ){                          //roomid also to pass
        this.logger.verbose("boooking created");
        return this.bookingService.createBooking(createbookingDto,user); 
    
    }

    //get all bookings of user

    @Get('user-bookings')
    getBookings(@Request() req: any,
        @GetUser() user: User,
    ): Promise<Booking[]> {
        this.logger.verbose("retrieving all bookings of thee user");
        return this.bookingService.getBookings(req, user);
    }

    //cancelbooking
    @Delete('/:book_id')
    deleteTask(
        @Param('book_id', ParseIntPipe) book_id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.bookingService.deletebooking(book_id, user);
    }

    //get booking details










}
