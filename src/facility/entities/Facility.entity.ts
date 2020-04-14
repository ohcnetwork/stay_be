import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('facility')
@Unique(['hotelName'])
export class Facility {
    
    @PrimaryGeneratedColumn()
    hotelId:number;

    @Column()
    hotelOwnerId: number;

    @Column({ length:128 })
    hotelName: string;

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
    facilityDescription: string;
}