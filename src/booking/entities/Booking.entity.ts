
import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne,  JoinColumn, BaseEntity, Entity } from "typeorm";
import { User } from "src/auth/entities/User.entity";
import { Room } from "src/rooms/entity/room.entity";

@Entity('bookings')
export class Booking extends BaseEntity {
    

    @PrimaryGeneratedColumn()
    book_id:number;

    @Column()
    checkin:string;

    @Column()
    checkout: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

 //  @ManyToOne(type => User, user => user.booking, { eager:false} )
  //  user: User;

  //  @Column()
    //roomId: number;
    

   /* @OneToOne(type => Room, room => room.booking, {
        cascade: ['update'],
    })
    @JoinColumn()
    room: Room;*/


   // @Column()
    //userId: number;  //user_id

    @ManyToOne(type => User, user => user.booking)
    @JoinColumn({name:'userId'})
    user: User;

    @ManyToOne(type => Room, room => room.booking)
    @JoinColumn({name:'roomId'})
    room: Room;
    

    
    @Column()
    statusBooking: string;

    @Column()
    statusCheckin: string;


}