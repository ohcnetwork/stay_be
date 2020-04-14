import { Controller, Get ,Post, Body,Param, Delete,Patch,Query, ValidationPipe, UsePipes, ParseIntPipe} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {CreateRoomDto} from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-room-filter';
import {RoomStatusValidationPipe} from './pipes/room-status-validation.pipe'
import { Room } from './room.entity';
import { RoomStatus } from './room-status.enum';
@Controller('rooms')
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
    @Post()
    @UsePipes(ValidationPipe)
    createRoom(@Body() createRoomDto : CreateRoomDto):Promise<Room>
    {
        return this.roomsService.createRoom(createRoomDto); 
    }

    @Delete('/:id')
    deleteRoom(@Param('id',ParseIntPipe) id:number):Promise<void>{
        return this.roomsService.deleteRoom(id);
    }

    @Patch('/:id/status')
    updateRoomStatus(
     @Param('id',ParseIntPipe)id:number,
     @Body('status',RoomStatusValidationPipe) status:RoomStatus):Promise<Room>
     {
            return this.roomsService.updateRoomStatus(id,status);
     } 
}