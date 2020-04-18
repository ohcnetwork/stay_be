import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('role')
//@Unique(['userId'])
export class Role {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userId: number;

    @Column()
    facilityId: number;

    @Column({ length:128 })
    role: string;
}
