import { Column, Entity, PrimaryGeneratedColumn, Unique,ManyToOne} from 'typeorm';
import { Room } from 'src/rooms/entity/room.entity';

@Entity('facility')
@Unique(['name'])
export class Facility {
    
    @PrimaryGeneratedColumn()
    hotelId:number;

    @Column()
    ownerID: number;

    @Column({ length:128 })
    name: string;

    @Column({ length:128 })
    address: string;

    @Column({ length:128 })
    panchayath:string;

    @Column({ length:128 })
    district:string;

    @Column()
    starCategory: number;


    @Column()
    latitude:string;

    @Column()
    longitude:string;

    @Column({ length:128 })
    facilities: string;

    @Column({ length:11})
    contact:string;

    @Column()
    policy:string;

    @Column()
    photos:string;

    @Column()
    status:string;

    @ManyToOne(type => Room, room=>room.facility)
    room:Room;

}