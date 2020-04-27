import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { RoomStatus } from "../room-status.enum";
import { Booking } from 'src/booking/entities/Booking.entity';
import { Facility } from 'src/facility/entities/Facility.entity';
@Entity()
export class Room extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    title:string;


    @Column()
    features:string;

    @Column()
    description:string;

    @Column()
    category:string;

    @Column()
    beds:number;

    @Column({type:'jsonb',nullable:true})
    photos:any;

    @Column()
    cost:number;

    @Column()
    status: RoomStatus;

    @OneToMany(type => Booking, booking => booking.room)
    booking: Booking[];


    @ManyToOne(type => Facility, facility => facility.room)
    @JoinColumn()
    facility:Facility;

   // @Column()
   // facilityId:number;
}
