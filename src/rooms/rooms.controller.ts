import { Controller, Get ,Post, Body,Param, Delete,Patch,Query, ValidationPipe, UsePipes, ParseIntPipe} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {CreateRoomDto} from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-room-filter';
import {RoomStatusValidationPipe} from './pipes/room-status-validation.pipe'
import { Room } from './entity/room.entity';
import { RoomStatus } from './room-status.enum';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Rooms Management')
@Controller('api/v1/rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Get()
    getRooms(@Query(ValidationPipe) filterDto:GetRoomsFilterDto){
        return this.roomsService.getRooms(filterDto);
    }

    @Get('/:id')
    getRoomById(@Param('id',ParseIntPipe) id:number):Promise<Room>{
        return this.roomsService.getRoomById(id);
    }

    @Post('/:hotelid')
    @UsePipes(ValidationPipe)

        createRoom(
        @Param('hotelid') id:number,
        @Body() createRoomDto : CreateRoomDto,
    ):Promise<Room>
    {
        return this.roomsService.createRoom(createRoomDto,id);  
    }

    @Delete('/:id')
    deleteRoom(@Param('id',ParseIntPipe) id:number):Promise<void>{
        return this.roomsService.deleteRoom(id);
    }

    @Patch('/status/:id')
    updateRoomStatus(
     @Param('id',ParseIntPipe)id:number,
     @Body('status',RoomStatusValidationPipe) status:RoomStatus):Promise<Room>
     {
            return this.roomsService.updateRoomStatus(id,status);
     } 
     @Get('/hotel/:hotelId')
	 getHotelDetail(@Param('hotelId',ParseIntPipe) hotelId: number): Promise<any> {
		 return this.roomsService.getHotelDetail(hotelId);
	 }
	 @Get('/hotelid/:facilityId')
	 getHotelId(@Param('facilityId',ParseIntPipe) facilityId:number):Promise<any> {
		 return this.roomsService.getHotelId(facilityId);
     }
     @Get('/get/details')
     getPrice():Promise<any>{

         return this.roomsService.getPrice();
     }

}
