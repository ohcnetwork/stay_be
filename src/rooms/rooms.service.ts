import { Injectable, NotFoundException, UnauthorizedException, HttpException, HttpStatus} from '@nestjs/common';
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
        if((found.type === 'facilityowner' && hotel.ownerID === found.id)||(found.type === 'admin')){
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
        try
        {
            let imgUrls;
            if(await this.validateUser(user,id))
            {
                if(files)
                {
                    imgUrls = await this.roomRepository.replaceImageUrl(files);
	            }
                return this.roomRepository.createRoom(createRoomDto,id,this.facilityRepository,imgUrls);
            }
            else
            {
                throw new HttpException("Action Forbidden",HttpStatus.FORBIDDEN);
            }
        }catch(e){
            return e;
        }
    }
    async deleteRoom(user:User,id:any):Promise<any>{

        
        const user1=await this.userRepository.findOne({id:user.id})
        if(id.roomid.length>0){
        for(var i=0;i<id.roomid.length;i++)
	{
            
        	const result= await this.roomRepository.findOne(id.roomid[i]);
        	if(await this.roomRepository.validateUserFacility(user1,result.id))
		{
		  if(!result)
		    {
		    	throw new NotFoundException(`Room with id ${id.roomid[i]} not found.`);
		    }
		   else
		   {
			result.status=RoomStatus.NOT_AVAILABLE
			await this.roomRepository.save(result);
		   }
    	        }
     }
}

else{
    return new HttpException("no id given",HttpStatus.BAD_REQUEST)
}
}

     async updateRoomStatus(user:User,id:number,status:RoomStatus):Promise<Room>{

         const user1 = await this.userRepository.findOne({id:user.id})

        const room = await this.getRoomById(id);
        if(await this.roomRepository.validateUserFacility(user1,room.id)){
        room.status=status;
        await room.save();
        return room;}
    }

    async getHotelDetail(id:number):Promise<any>{
        const hotel = await this.facilityRepository.findOne({id});
        const room = await this.roomRepository.find({facility:hotel,status:RoomStatus.AVAILABLE})
        var finalHotel=[]
        if(room) {
            const {...result}=room;
            for(const i in result)
            {
                for(const j in result[i].photos)
                {
                    if(!result[i].photos[j].includes('/'))
                         result[i].photos[j] = `https://${process.env.CDN_URL}/${result[i].photos[j]}`;
                }
                finalHotel.push(result[i])
            }
        
        if(hotel){
            return {
                name: hotel.name,
                data: finalHotel
            }
        }
        else {
            throw new HttpException("hotel not found",HttpStatus.NOT_FOUND)
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

        //edit rooms
        async updateRooms(user:User,data:any,files:any): Promise <any> 
        {
            let imgUrls ;
            const roomsUpdate = [];
            const idList = data.ids.split(",");
            const user1=await this.userRepository.findOne({id:user.id})
            for(const x in idList)
            {   
                if(await this.roomRepository.validateUserFacility(user1,idList[x])){ 
                const room = await this.roomRepository.findOne({id:idList[x] })
                if(room)
                {
                    if(data.title) {
                        room.title=data.title
                    }
                    if(data.features) {
                        room.features=data.features
                    }
                    if(data.description) {
                        room.description=data.description
                    }
                    if(data.category){
                        room.category = data.category
                    }
                    if(data.cost){
                        room.cost= data.cost;
                    }
                    if(data.status){
                        room.status=data.status
                    }
                    if(data.beds){
                        room.beds= data.beds;
                    }
                    if(files)
                    {  
                        
                        imgUrls = await this.roomRepository.replaceImageUrl(files);

                        if(imgUrls.length>0)
                            room.photos=imgUrls;
			    
			            imgUrls=[];
                    }
                    await this.roomRepository.save(room);
                    const {...result} = room
                    roomsUpdate.push(result);
                }
                else 
                {
                    return {
                        sucess:false,
                        message: "Updatation failed"
                    }
                }
            }
        }
            return {
                success:true,
                statusCode:200,
                data: roomsUpdate[0]
            };
        }
}

