import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne,  JoinColumn, BaseEntity, Entity, OneToMany } from "typeorm";
import { Booking } from "./Booking.entity";

@Entity('guestdetail')
export class GuestDetail extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    age:number;

    @Column()
    gender:string;

    @Column()
    number:number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Booking, booking => booking.guestdetail)
    @JoinColumn({name:'bookingsId'})
    booking: Booking;











}