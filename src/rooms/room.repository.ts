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
            query.andWhere('(room.title LIKE :search OR room.description LIKE :search OR room.address LIKE :search)',{search: `%${search}%`});
        }


        return await query.getMany();
    }

    async createRoom(createRoomDto: CreateRoomDto):Promise<Room>{
        const {title,address,features,description,category,beds,photos,cost,policy}=createRoomDto;
        const room = new Room();
        room.title=title;
        room.address=address;
        room.features=features;
        room.description=description;
        room.category=category;
        room.beds=beds;
        room.photos=photos;
        room.cost=cost;
        room.status=RoomStatus.AVAILABLE;
        room.policy=policy;
        await room.save();
        return room;
    }

    async rooms(): Promise<any> {
        const query = this.createQueryBuilder('room');
        query.leftJoin('room.user', 'user')
          .leftJoin('room.booking', 'booking').select( ['user.id', 'user.name', 'user', 'room', 'booking']);
        const [data, count] =  await query.getManyAndCount();
    }
}
