import { Injectable,Logger, NotFoundException } from '@nestjs/common';
import { FacilityRepository } from './facility.repository'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Facility } from './entities/Facility.entity';
//import { UpdateFacilityDto } from './dto';

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
            const facility = await this.facilityRepository.findOne({ hotelName:data.hotelName });
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

    async getAllStay(req: any): Promise<any> {
        return this.facilityRepository.getAllFacility();
    }

    async getFacility(req:any): Promise<any> {
        const { id } = req.user
        const facility = await this.facilityRepository.find({ hotelownerid:id })
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
    async deleteFacility(facility:Facility,data:any):Promise<any> {
        try{
        //    const id = facility.id;
        //    const stay = await this.facilityRepository.findOne({id});
            const stay = await this.facilityRepository.findOne({ hotelId:data.hotelId })
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
    async updateFacility(facility:Facility,data:any): Promise <any> {
        //const id = facility.id;
        //const stay = await this.facilityRepository.findOne({id});
        const stay = await this.facilityRepository.findOne({ hotelId:data.hotelId })
        if(stay){
            if(data.hotelName) {
                stay.hotelName=data.hotelName
            }
            if(data.stayDescription) {
                stay.stayDescription=data.stayDescription
            }
            if(data.address) {
                stay.address=data.address
            }
            if(data.latitude) {
                stay.latitude = data.latitude
            }
            if(data.longitude) {
                stay.longitude = data.longitude
            }
            if(stay.panchayath){
                stay.panchayath = data.panchayath
            }
            if(stay.district){
                stay.district=data.district
            }
            await this.facilityRepository.save(stay);
            const {...result} = stay
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
}
