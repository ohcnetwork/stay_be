import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { RoomStatus } from "../room-status.enum";
import { User } from '../../auth/entities/User.entity';
import { Booking } from 'src/booking/entities/Booking.entity';
@Entity()
export class Room extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    address:string;

    @Column()
    features:string;

    @Column()
    description:string;

    @Column()
    category:string;

    @Column()
    beds:number;

    @Column()
    photos:string;

    @Column()
    cost:number;

    @Column()
    status: RoomStatus;

    @Column()
    policy: string;

    @OneToMany(type=> User, user => user.room, {
        cascade: ['update'],
    })
    @JoinColumn({name: 'id'})
    user: User;

    @OneToOne(type => Booking, booking => booking.room) 
    booking: Booking;


}
