import { EntityRepository, Repository } from 'typeorm';
import { Facility } from './entities/Facility.entity';
import { AddFacilityDto } from './dto';

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
    //Create Facility
    async createFacility(addFacilityDto: AddFacilityDto,id:number,imgUrls:any):Promise<any>{

        const {name,address,panchayath,district,facilities,starCategory,latitude,longitude,contact,policy}=addFacilityDto;
        const facility = new Facility();
        facility.name = name;
        facility.address = address;        
        facility.panchayath =panchayath ;        
        facility.district = district;        
        facility.starCategory =starCategory ;        
        facility.latitude = latitude;        
        facility.longitude =longitude ;        
        facility.contact = contact;        
        facility.policy = policy;  
        facility.facilities=facilities;      
        facility.ownerID = id;        
        facility.photos = imgUrls;   
        facility.status= 'ACTIVE';
        await facility.save();     
        return facility;
        

    }
}
