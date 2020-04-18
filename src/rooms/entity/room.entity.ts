import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { RoomStatus } from "../room-status.enum";
import { User } from '../../auth/entities/User.entity';
import { Booking } from 'src/booking/entities/Booking.entity';
@Entity()
export class Room extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    hotelId:number;

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


    @OneToOne(type => Booking, booking => booking.room) 
    booking: Booking;


}
