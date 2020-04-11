import { EntityRepository, Repository } from 'typeorm';
import { Stay } from './entities/Stay.entity';

@EntityRepository(Stay)
export class StayRepository extends Repository<Stay> {
    async getAllStay(): Promise<Stay[]>{
        const query = this.createQueryBuilder('stay');
        return await query.getMany();
    }
}