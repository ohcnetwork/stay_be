import { BaseEntity, Entity, PrimaryGeneratedColumn, Column  } from 'typeorm';
import { RoomStatus } from "../room-status.enum";
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



}
