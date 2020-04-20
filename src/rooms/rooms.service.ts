import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-room-filter';
import {RoomRepository} from './room.repository';
import {InjectRepository} from '@nestjs/typeorm';
import { Room } from './entity/room.entity';
import { User} from '../auth/entities/User.entity';
import { RoomStatus } from './room-status.enum';
import { FacilityRepository } from 'src/facility/facility.repository';
import { UserRepository } from 'src/auth/user.repository';


@Injectable()
export class RoomsService {
    constructor (
        @InjectRepository(FacilityRepository)
		private facilityRepository : FacilityRepository,
        @InjectRepository(RoomRepository)
        private roomRepository : RoomRepository,
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
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
    async getRooms(filterDto:GetRoomsFilterDto):Promise<Room[]>{
        return this.roomRepository.getRooms(filterDto,this.facilityRepository);
    }
    
    async getRoomById(id:number):Promise<Room>{
        const found = await this.roomRepository.findOne(id);
        if(!found) 
        {
            throw new NotFoundException(`Room with id ${id} not found.`);
        } 
        return found;
    }
    
    async createRoom(user:User,createRoomDto: CreateRoomDto,id:number){
        if(await this.validateUser(user)){
        return this.roomRepository.createRoom(createRoomDto,id);       
        }
    }
    async deleteRoom(user:User,id:number):Promise<void>{
       if(await this.validateUser(user)) {
           const result= await this.roomRepository.delete(id);
        if(result.affected===0)
        {
            throw new NotFoundException(`Room with id ${id} not found.`);
        }
    }
    }

    async updateRoomStatus(user:User,id:number,status:RoomStatus):Promise<Room>{
        if(await this.validateUser(user)){
        const room = await this.getRoomById(id);
        room.status=status;
        await room.save();
        return room;}
    }

    async getHotelDetail(id:number):Promise<any>{
        const room = await this.roomRepository.find({hotelId:id,status:RoomStatus.AVAILABLE})
        const hotel = await this.facilityRepository.findOne({hotelId:id});
        console.log(room,hotel)
        if(hotel){
            return {
                name: hotel.name,
                data: room
            }
        }
        }
        //Get hotel id when room id is passed
        async getHotelId(id:number): Promise<any>{
            const room = await this.roomRepository.findOne({id:id})
            return {
                data: room.hotelId
            }
        }

        //get minimum and maximum cost of rooms
        async getPrice():Promise<any>{
            return await this.roomRepository.getPrice();
        }
    
}
