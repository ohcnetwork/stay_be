import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('facility')
@Unique(['name'])
export class Facility {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length:128 })
    name: string;

    @Column({ length:128 })
    address: string;

    @Column({ length:128 })
    panchayath:string;

    @Column()
    cost:number

    @Column()
    rooms_Available: number;

    @Column()
    star_category: number;

//    @Column()
//    telephone:number;

    @Column()
    latitude:string;

    @Column()
    longitude:string;

    @Column({ length:128 })
    stayDescription: string;
}