import { EntityRepository, Repository } from 'typeorm';
import { Room } from './entity/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomStatus } from './room-status.enum';
import { GetRoomsFilterDto } from './dto/get-room-filter';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room>{

    async getRooms(filterDto: GetRoomsFilterDto):Promise<Room[]>{
        const {category,search} = filterDto;
        const query = this.createQueryBuilder('room');

        if(category){
            query.andWhere('room.category = :category',{category});
        }

        if(search){
            query.andWhere('(room.title LIKE :search OR room.description LIKE :search OR room.status LIKE :search)',{search: `%${search}%`});
        }
      return await query.getMany();
    }
    
            
    //Create Room
    async createRoom(createRoomDto: CreateRoomDto,id:number):Promise<any>{

        const roomId = [];
        const {noOfRooms,photos,title,features,description,category,beds,cost}=createRoomDto;
        for(let i=0; i<noOfRooms;i++)
        { 
        const room = new Room();
        room.hotelId = id;
        room.title=title;
        room.features=features;
        room.description=description;
        room.category=category;
        room.beds=beds;
        room.photos=photos; //need to be done
        room.cost=cost;
        room.status=RoomStatus.AVAILABLE;
        await room.save();
        roomId.push(room);
        }
        return roomId;
        

    }
}
