import { Injectable,Logger, NotFoundException } from '@nestjs/common';
import { FacilityRepository } from './facility.repository'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Facility } from './entities/Facility.entity';

@Injectable()
export class FacilityService {
    private logger = new Logger('Facility Controller');
    constructor(
   @InjectRepository(FacilityRepository)
   private readonly facilityRepository: FacilityRepository){}
   gethello(): string { //to just see that it works
        return 'Welcome to stay service';
    }
    

    async addfacility(data:any): Promise<any> {
        try {
            const facility = await this.facilityRepository.findOne({ name:data.name });
            if(!facility) {
                data.status = 'ACTIVE';
                const registerStay = await this.facilityRepository.save(data);
                const { name, ...result } = registerStay;
                return{
                    success: true,
                    message: 'Success',
                    data: result,
                }
            }
        } catch (e) {
            return {
                success: false,
                message: 'Something went wrong adding facility failed\n'+e
            }
        }
        
    }

/*    async updateRooms(facility:Facility,data:any):Promise<any> {
        try {
            //const id = facility.id;
            //const facility = await this.facilityRepository.findOne({id});
            const facility = await this.facilityRepository.findOne({ id:data.id });
            if(facility){
                facility.rooms_Available=data.rooms_Available;
                await this.facilityRepository.save(facility);
                const { name, ...result } = facility;
                return {
                    success:true,
                    message:'Success',
                    data:result,
                }
            }
            else{
                return {
                    success:false,
                    message:'updation failed',
                }
            }
        } catch(e){
            throw new NotFoundException('Could not find the Facility');
        }
    }*/
    async getAllStay(req: any): Promise<any> {
        return this.facilityRepository.getAllFacility();
    }

    async deleteFacility(facility:Facility,data:any):Promise<any> {
        try{
        //    const id = facility.id;
        //    const stay = await this.facilityRepository.findOne({id});
            const stay = await this.facilityRepository.findOne({ id:data.id })
            if(stay){
            this.facilityRepository.delete(stay);
            
            return{
                sucess:true,
                message: 'Deleted Successfully'
            }
        }
            else{
                return{
                    sucess:false,
                    message: 'Deletion Failed'
                }
            }
        } catch(e) {
            return {
                success: false,
                message: 'Deletion Failed'
            }
        }

    }
}
