import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,  } from 'typeorm';
import { RoomStatus } from "../room-status.enum";
import { Facility } from 'src/facility/entities/Facility.entity';
@Entity()
export class Room extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Facility,facility => facility.room,{cascade:['update']})
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

    @Column({type:'jsonb',nullable:true})
    photos:any;

    @Column()
    cost:number;

    @Column()
    status: RoomStatus;

}
