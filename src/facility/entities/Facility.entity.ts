import { Column, Entity, PrimaryGeneratedColumn, OneToMany, BaseEntity} from 'typeorm';
import { Room } from 'src/rooms/entity/room.entity';

@Entity('facility')

export class Facility extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id:number;

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

    @Column({type:'jsonb',nullable:true})
    photos:any;

    @Column()
    status:string;

    @OneToMany(type => Room, room => room.facility)
    room: Room[];


}