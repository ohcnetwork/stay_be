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

    async validateUser(user:User,id:any): Promise<any> {
        const found = await this.userRepository.findOne({id:user.id})
        const hotel = await this.facilityRepository.findOne({id:id})
        console.log(found.type,hotel.id)
        if(found.type === 'facilityowner' && hotel.ownerID === found.id){
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

    async createRoom(user:User,createRoomDto: CreateRoomDto,id:number,files:any){
        const imgUrls=[];
        if(await this.validateUser(user,id)){
            for(let i=0;i<files.length;i++)
            {
                const imgLink = files[i].location;
                const replaceLink = imgLink.replace("stay-cdn.s3.amazonaws.com","stay.cdn.coronasafe.network");
                imgUrls.push(replaceLink);
            }
            return this.roomRepository.createRoom(createRoomDto,id,this.facilityRepository,imgUrls);
        }
    }
    async deleteRoom(user:User,id:number):Promise<void>{
        const result= await this.roomRepository.findOne(id);
       if(await this.validateUser(user,result.facility.id)) {
           if(!result)
            {
            throw new NotFoundException(`Room with id ${id} not found.`);
         }
         else{
           result.status=RoomStatus.NOT_AVAILABLE
           await this.roomRepository.save(result);
         }
    }
    }

     async updateRoomStatus(user:User,id:number,status:RoomStatus):Promise<Room>{
        const room = await this.getRoomById(id);
        if(await this.validateUser(user,room.facility.id)){
        room.status=status;
        await room.save();
        return room;}
    }

    async getHotelDetail(id:number):Promise<any>{
        const hotel = await this.facilityRepository.findOne({id});
        const room = await this.roomRepository.find({facility:hotel,status:RoomStatus.AVAILABLE})
        
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
                data: room.facility.id
            }
        }

        //get minimum and maximum cost of rooms
        async getPrice():Promise<any>{
            return await this.roomRepository.getPrice();
        }

}