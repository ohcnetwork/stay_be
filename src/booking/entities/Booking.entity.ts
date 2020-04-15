import {PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Entity} from "typeorm";
import { User } from "src/auth/entities/User.entity";

@Entity('booking')
export class Booking {
    save() {
        throw new Error("Method not implemented.");
    }

    @PrimaryGeneratedColumn()
    book_id:number;

    @Column()
    checkin: Date;

    @Column()
    checkout: Date;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.booking, { eager:false} )
    user: User;

    @Column()
    userId: number;  //user_id

    @Column()
    roomId: number;

    //relation for roomid


}
