import { Injectable,Logger, HttpException, HttpStatus, ParseIntPipe} from '@nestjs/common';
import { FacilityRepository } from './facility.repository'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Facility } from './entities/Facility.entity';
import { UpdateFacilityDto } from './dto';
import { User } from 'src/auth/entities/User.entity';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class FacilityService {
    private logger = new Logger('Facility Controller');
    constructor(
   @InjectRepository(FacilityRepository)
   @InjectRepository(UserRepository)
   private readonly facilityRepository: FacilityRepository,
   private readonly userRepository:UserRepository){}
   gethello(): string { 
        return 'Welcome to stay service';
    }
    

    async addfacility(data:any,user1:User): Promise<any> {
            const user = await this.userRepository.findOne({id:user1.id})
            this.logger.verbose(user.type)
            if(user.type === 'facilityowner'){
                data.status = 'ACTIVE';
                data.ownerID=user.id;
                const registerStay = await this.facilityRepository.save(data);
                const {...result } = registerStay;
                return{
                    success: true,
                    message: 'Success',
                    data: result,
                }
            }
            else{
                throw new HttpException("Action Forbidden",HttpStatus.FORBIDDEN);
            }
        
        
    }

    async getAllFacility(): Promise<any> {
        return this.facilityRepository.getAllFacility();
    }
   

    async getFacility(user1:User): Promise<any> {
        const id = user1.id
        const user = await this.userRepository.findOne({id:user1.id})
            this.logger.verbose(user.type)
            if(user.type === 'facilityowner'){
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
    else{
        throw new HttpException("Action Forbidden",HttpStatus.FORBIDDEN);
    }
    }
    async deleteFacility(id:number):Promise<any> {
        try{
            const facility = await this.facilityRepository.findOne({ hotelId:id})
            if(facility){
            facility.status = "NOT_AVAILABLE"
            await this.userRepository.save(facility);
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
            if(data.panchayath!="null"){
                facility.panchayath = data.panchayath
            }
            if(data.district!="null"){
                facility.district=data.district
            }
            if(data.policy){
                facility.policy=data.policy;
            }
            if(data.starCategory){
                facility.starCategory=data.starCategory;
            }
            if(data.contact){
                facility.contact= data.contact;
            }
            if(data.status){
                facility.status=data.status
            }
            if(data.photos)
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
    //get all districts
    async getDistricts():Promise<any>{
        return await this.facilityRepository.getDistricts();
    }
}
