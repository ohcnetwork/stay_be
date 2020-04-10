import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getAllUsers(): Promise<User[]>{
    const query = this.createQueryBuilder('users');
    return await query.getMany();
  }
}
