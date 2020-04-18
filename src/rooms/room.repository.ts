import { Repository, EntityRepository } from 'typeorm';
import { Room } from './entity/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomStatus } from './room-status.enum';
import { GetRoomsFilterDto } from './dto/get-room-filter';
import { FacilityRepository } from 'src/facility/facility.repository';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room>{

    async getRooms(filterDto: GetRoomsFilterDto,facilityRepository:FacilityRepository):Promise<any>{
        
        const {beds,category,search,minimum,maximum,district} = filterDto;

        const query = this.createQueryBuilder('room');


        if(district){
            const facility = await facilityRepository.find({district});
            for(const i in facility){
                const id = facility[i].hotelId;
            query.andWhere('room.hotelId = :id',{id}); 
        }
        if(beds)
        {
            query.andWhere('room.beds = :beds',{beds});
        }
        }

        if(category){
            query.andWhere('room.category = :category',{category});
        }
        if(minimum && maximum){
            query.andWhere('room.cost >= :minimum AND room.cost <= :maximum',{minimum,maximum});
        }
        if(search){
            query.andWhere('(room.title LIKE :search OR room.description LIKE :search OR room.status LIKE :search)',{search: `%${search}%`});
        }

    const[room,count]= await query.getManyAndCount();
    //from all the rooms extract unique hotel id's
    const list= [];
    for(let i=0;i<count;i++)
    {
        const id = room[i].hotelId;
        if(list.indexOf(id)=== -1 )
        {
            list.push(id);
        }
    }
    //get the hotel details based on id's
    const hotels = [];
    for(const i in list)
    {
        const finalHotel = await facilityRepository.findOne({hotelId:list[i]});
        hotels.push(finalHotel);
    }
    return hotels;
 }

    async getPrice():Promise<any>{
        const details = [];
        const query = this.createQueryBuilder("room");
        details.push(await query.select("DISTINCT(room.category)","category").getRawMany());
        details.push(await query.select("MIN(room.cost)","minimum")
        .addSelect("MAX(room.cost)","maximum")
        .getRawMany());
        return details;
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
