import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  email: string;

  @Column({ length: 128 })
  password: string;

  @Column({ length:128 })
  type: string;

  @Column({ length: 128 })
  status: string;

  @Column({ nullable: true })
  referal: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  // @ManyToOne(type => Room, room => room.user)
  // @JoinColumn({name: 'id'})
  // room: Room;
}
