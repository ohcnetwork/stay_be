import { Repository, EntityRepository } from 'typeorm';
import { Room } from './entity/room.entity';
import { RoomStatus } from './room-status.enum';
import { GetRoomsFilterDto } from './dto/get-room-filter';
import { FacilityRepository } from 'src/facility/facility.repository';
import { Booking } from 'src/booking/entities/Booking.entity';

import { User } from 'src/auth/entities/User.entity';

import { UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';


@EntityRepository(Room)
export class RoomRepository extends Repository<Room>{

    //Get the list of rooms and hotels based on filters
    async getRooms(filterDto: GetRoomsFilterDto,
        facilityRepository:FacilityRepository,
        ):Promise<any>{
        
        const {beds,category,search,minimum,maximum,district,checkin,checkout,type,hotelid,roomid,sort} = filterDto;
        const notAvailable= [];
        //if filter type is hotel
        if(type.localeCompare("hotel")===0){

        const query = this.createQueryBuilder('room').innerJoin('room.facility','facility').select(['facility.id','room.id','facility.status']).where('facility.status = :ACTIVE',{ACTIVE:'ACTIVE'}).andWhere('room.status =:AVAILABLE',{AVAILABLE:'AVAILABLE'});

       
        if(district)
        {   const id = [];
            const facility = await facilityRepository.find({district});
            for(let i=0;i<facility.length;i++)
            {
                id.push(facility[i].id);
            }
            if(id.length>0)
            {
             query.andWhere('room.facility.id IN (:...id)',{id}); 
            }
            else
            {
                return id;
            }
        }
        if(beds)
        {
            query.andWhere('room.beds >= :beds',{beds});
        }
        if(category){
            query.andWhere('room.category = :category',{category});
        }
        if(minimum && maximum){
            query.andWhere('room.cost >= :minimum AND room.cost <= :maximum',{minimum,maximum});
        }
        //query to find rooms based on check in and check out
        if(checkin && checkout)
        {
            const query1 = this.createQueryBuilder().from(Booking,'bookings').innerJoin('bookings.room','room').select(['bookings.book_id','bookings.checkin','bookings.checkout','room.id','bookings.statusBooking','bookings.statusCheckin']);
            query1.where('(bookings.statusBooking != :Cancelled) AND (bookings.statusCheckin != :Checkout) AND ((bookings.checkin <= :checkin AND checkout >= :checkout) OR (checkin < :checkin  AND checkout >= :checkout) OR (checkin >= :checkin AND checkout <= :checkout) OR (checkin >= :checkin AND checkin <= :checkout) OR ( checkin  <= :checkin AND (checkout >= :checkin AND checkout <= :checkout)))',{Cancelled:"CANCELLED",Checkout:"CHECKEDOUT",checkin,checkout})
            const bookId=await query1.getMany()
            for(let i=0;i<bookId.length;i++)
            {
                notAvailable.push(bookId[i].room.id);  
            }
            if(bookId.length>0)
            {
                query.andWhere("room.id NOT IN (:...ids)",{ids:notAvailable});
            }
            
        }
        if(search){
            query.andWhere('(room.title LIKE :search OR room.description LIKE :search OR room.status LIKE :search)',{search: `%${search}%`});
        }
        if(sort){
        if(sort === 'low_to_high')
        query.orderBy("room.cost","ASC")
        else if(sort === 'high_to_low')
        query.orderBy("room.cost","DESC")
        else{
            throw new HttpException("enter valid sort string",HttpStatus.NOT_FOUND)

        }}

    const[room,count]= await query.getManyAndCount();
    //from all the rooms extract unique hotel id's
    const list= [];
    for(let i=0;i<count;i++)
    {
        const id = (room[i]&&room[i].facility.id);
        if(list.indexOf(id)=== -1 )
        {
            list.push(id);
        }
    }
    //get the hotel details based on id's
    const hotels = [];
    for(const i in list)
    {
        const finalHotel = await facilityRepository.findOne({id:list[i]});
        hotels.push(finalHotel);
    }
    for(const i in hotels)
    {
        for(const j in hotels[i].photos)
        {
            if(!hotels[i].photos[j].includes('/'))
                hotels[i].photos[j] = `https://${process.env.CDN_URL}/${hotels[i].photos[j]}`;
        }
    }
    return hotels;
    } //if filter type is rooms or something
    else {
        //query to find rooms based on check in and check out
        const query = this.createQueryBuilder('room').where('room.status =:AVAILABLE',{AVAILABLE:'AVAILABLE'});
        if(checkin && checkout)

        { 
         const query1 = this.createQueryBuilder().from(Booking,'bookings').innerJoin('bookings.room','room').select(['bookings.book_id','bookings.checkin','bookings.checkout','room.id','bookings.statusBooking','bookings.statusCheckin']);
         query1.where('(bookings.statusBooking != :Cancelled) AND (bookings.statusCheckin != :Checkout) AND ((bookings.checkin <= :checkin AND checkout >= :checkout) OR (checkin < :checkin  AND checkout >= :checkout) OR (checkin >= :checkin AND checkout <= :checkout) OR (checkin >= :checkin AND checkin <= :checkout) OR ( checkin  <= :checkin AND (checkout >= :checkin AND checkout <= :checkout)))',{Cancelled:"CANCELLED",Checkout:"CHECKEDOUT",checkin,checkout})
         const bookId=await query1.getMany()
         if(bookId)
         {
                for(let i = 0; i<bookId.length;i++)
                {
                    notAvailable.push(bookId[i].room.id);  
                }
         }
         if(bookId.length>0)
         {
                if(hotelid){
                    query.andWhere("room.id NOT IN (:...ids) AND room.facility.id = :hotelId",{ids:notAvailable,hotelId:hotelid});
                }
                if(roomid)
                {
                    query.andWhere("room.id NOT IN (:...ids) AND room.id = :roomId",{ids:notAvailable,roomId:roomid});
                }
         }
         else{
                if(hotelid){
                    query.andWhere("room.facility.id = :hotelId",{hotelId:hotelid});
                }
                if(roomid)
                {
                    query.andWhere("room.id = :roomId",{roomId:roomid});
                }
            }


                if(category)
                {
                    query.andWhere('room.category = :category',{category});
                }

                if(minimum && maximum)
                {
                    query.andWhere('room.cost >= :minimum AND room.cost <= :maximum',{minimum,maximum});
                }
                
                if(beds)
                {
                    query.andWhere('room.beds >= :beds',{beds});
                }
            
        }
        const rooms= await query.getMany();
        if(rooms)
        {
            for(const i in rooms)
            {
                for(const j in rooms[i].photos)
                {   
                    if(!rooms[i].photos[j].includes('/'))
                        rooms[i].photos[j] = `https://${process.env.CDN_URL}/${rooms[i].photos[j]}`;
                }
            }
            return rooms;
        }
        else
        {
             console.log("Rooms with provided specification not available!!");
        }
    }
 }

    //To get the maximum and minimum price of rooms and different categories available
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
    async createRoom(createRoomDto: any,id:number,facilityRepository:FacilityRepository,imgUrls:any):Promise<any>{

        const roomId = [];
        const facility = await facilityRepository.findOne(id);
        const {noOfRooms,title,features,description,category,beds,cost}=createRoomDto;
        for(let i=0; i<noOfRooms;i++)
        { 

        const room = new Room();
        room.facility = facility;
        room.title=title;
        if(features ==="null")
            room.features=null;
        else
            room.features=features;
        room.description=description;
        room.category=category;
        room.beds=beds;
        room.photos=imgUrls; 
        room.cost=cost;
        room.status=RoomStatus.AVAILABLE;
        await room.save();
        roomId.push(room);

        }
        return roomId;
    }
    async validateUserFacility(user:any,id:any): Promise<any>{
        
        const query = this.createQueryBuilder('room');
            query.innerJoin('room.facility','facility')
                .select(['facility.id','room.id','facility.ownerID'])
                .where('room.id = :id and facility.ownerID = :userid', {id:id,userid:user.id})
            const result = await query.getOne()
            
            if(user.type==='facilityowner' && result)
            {
                return result;
            }
            else{
                throw new UnauthorizedException();
            }
    }
    async replaceImageUrl(files:any): Promise<any>
    {
        const imgUrls=[];
        const s3Urls = process.env.S3_URLS.split(",");
        let replaceLink;
        for(let i=0;i<files.length;i++)
        {
            const imgLink = files[i].location;
            for(const k in s3Urls)
                {
                    if(imgLink.includes(s3Urls[k]))
                    {
                        replaceLink = imgLink.replace(`https://${s3Urls[k]}/`,"");
                        imgUrls.push(replaceLink);
                    }
                }
        }
          return imgUrls;
    }
}

