import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('stay')
@Unique(['name'])
export class Stay {
    
    @PrimaryGeneratedColumn()
    id:string;

    @Column({ length:128 })
    name: string;

    @Column({ length:128 })
    address: string;

    @Column({ length:128 })
    type: string;

    @Column({ length:128 })
    rooms_Available: number;

    @Column({ length:128 })
    star_category: number;

    @Column({ length:128 })
    telephone:number;

    @Column({ length:128 })
    stay_Description: string;
}