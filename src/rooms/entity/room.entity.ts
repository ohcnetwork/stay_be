import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,  } from 'typeorm';
import { RoomStatus } from "../room-status.enum";
import { Facility } from 'src/facility/entities/Facility.entity';
import { type } from 'os';
@Entity()
export class Room extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    // @Column()
    @ManyToOne(type => Facility,facility => facility.room,{cascade:['update']})
    @JoinColumn({name:'hotelId'})
    facility:Facility;

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

    @Column()
    photos:string;

    @Column()
    cost:number;

    @Column()
    status: RoomStatus;


    // @OneToMany(type=> User, user => user.room, {
    //     cascade: ['update'],
    // })
    // @JoinColumn({name: 'id'})
    // user: User;

}
