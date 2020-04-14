import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-room-filter';
import {RoomRepository} from './room.repository';
import {InjectRepository} from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomStatus } from './room-status.enum';

@Injectable()
export class RoomsService {
    constructor (
        @InjectRepository(RoomRepository)
        private roomRepository : RoomRepository,
    ){}    
    
    async getRooms(filterDto:GetRoomsFilterDto):Promise<Room[]>{
        return this.roomRepository.getRooms(filterDto);
    }
    
    async getRoomById(id:number):Promise<Room>{
        const found = await this.roomRepository.findOne(id);
        if(!found) 
        {
            throw new NotFoundException(`Room with id ${id} not found.`);
        } 
        return found;
    }
    

    async createRoom(createRoomDto: CreateRoomDto){
        return this.roomRepository.createRoom(createRoomDto);
    }
    async deleteRoom(id:number):Promise<void>{
        const result= await this.roomRepository.delete(id);
        if(result.affected===0)
        {
            throw new NotFoundException(`Room with id ${id} not found.`);
        }
    }

    async updateRoomStatus(id:number,status:RoomStatus):Promise<Room>{
        const room = await this.getRoomById(id);
        room.status=status;
        await room.save();
        return room;
    }
    
}
