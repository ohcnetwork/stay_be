import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { RoomStatus } from "./room-status.enum";
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
    status:RoomStatus;

    @Column()
    policy:string;

}