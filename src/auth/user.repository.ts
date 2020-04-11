import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
