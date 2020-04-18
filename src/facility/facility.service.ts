import { Injectable,Logger} from '@nestjs/common';
import { FacilityRepository } from './facility.repository'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Facility } from './entities/Facility.entity';
import { UpdateFacilityDto } from './dto';

@Injectable()
export class FacilityService {
    private logger = new Logger('Facility Controller');
    constructor(
   @InjectRepository(FacilityRepository)
   private readonly facilityRepository: FacilityRepository){}
   gethello(): string { 
        return 'Welcome to stay service';
    }
    

    async addfacility(data:any): Promise<any> {
        try {

                data.status = 'ACTIVE';
                const registerStay = await this.facilityRepository.save(data);
                const {...result } = registerStay;
                return{
                    success: true,
                    message: 'Success',
                    data: result,
                }
        } catch (e) {
            return {
                success: false,
                message: 'Something went wrong adding facility failed\n'+e
            }
        }
        
    }

    async getAllFacility(): Promise<any> {
        return this.facilityRepository.getAllFacility();
    }
   

    async getFacility(id:number): Promise<any> {
        const facility = await this.facilityRepository.find({ ownerID:id })
        if(facility) {
            const {...result}=facility;
            return{
                success:true,
                message:"facilities retrieved",
                data:result
            };
        }
        else {
            return{
                success:false,
                message:"No Facilities exist"
            }
        }
    }
    async deleteFacility(id:number):Promise<any> {
        try{
            const facility = await this.facilityRepository.findOne({ hotelId:id})
            if(facility){
            this.facilityRepository.delete(facility);
            
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
    async updateFacility(id:number,data:UpdateFacilityDto): Promise <any> {
        const facility = await this.facilityRepository.findOne({ hotelId:id })
        if(facility){
            if(data.name) {
                facility.name=data.name
            }
            if(data.facilities) {
                facility.facilities=data.facilities
            }
            if(data.address) {
                facility.address=data.address
            }
            if(data.latitude) {
                facility.latitude = data.latitude
            }
            if(data.longitude) {
                facility.longitude = data.longitude
            }
            if(facility.panchayath!="null"){
                facility.panchayath = data.panchayath
            }
            if(facility.district!="null"){
                facility.district=data.district
            }
            if(facility.policy){
                facility.policy=data.policy;
            }
            if(facility.contact){
                facility.contact= data.contact;
            }
            if(facility.status){
                facility.status=data.status
            }
            if(facility.photos)
            {
                facility.photos=data.photos
            }
            await this.facilityRepository.save(facility);
            const {...result} = facility
            return {
                success:true,
                data: result
            };
        }
        else {
            return {
                sucess:false,
                message: "Updatation failed"
            }
        }
    }
    async searchDistrict(facility1:Facility,data:any): Promise<any> {
        const district = data.district
        const facility = await this.facilityRepository.find({district});
        if(facility) {
            const {...result}=facility
            return {
                success:true,
                data: result
            };
        }
        else {
            return {
                success: false,
                message : "no such facility exists"
            }
        }

    }
}
