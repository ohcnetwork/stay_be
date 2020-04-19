import { EntityRepository, Repository } from 'typeorm';
import { Facility } from './entities/Facility.entity';

@EntityRepository(Facility)
export class FacilityRepository extends Repository<Facility> {
    async getAllFacility(): Promise<Facility[]>{
        const query = this.createQueryBuilder('facility');
        return await query.getMany();
    }
    async getDistricts():Promise<any>{
        const query = this.createQueryBuilder("facility");
        return await query.select("DISTINCT(facility.district)").getRawMany();
    }
}