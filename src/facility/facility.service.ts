import { Injectable,Logger, HttpException, HttpStatus, UnauthorizedException} from '@nestjs/common';
import { FacilityRepository } from './facility.repository'; 
import { InjectRepository } from '@nestjs/typeorm';
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
    
    async validateUser(user:User): Promise<any> {
        console.log(user)
        const found = await this.userRepository.findOne({id:user.id})
        console.log(found.type,found.email)
        if(found.type === 'facilityowner'){
            return found
        }
        else {
            throw new UnauthorizedException('You are not authorized!!');
        }
    }

    async findHotel(user:User,id:any): Promise<any>{
        const found =await this.userRepository.findOne({id:user.id})
        const hotel = await this.facilityRepository.findOne({id:id})
        if(found.type === 'facilityowner' && hotel.ownerID === found.id){
            return found
        }
        else {
            throw new UnauthorizedException;
        }
    }
    async addfacility(data:any,user:User,files:any): Promise<any> {
                const imgUrls=[];
                if(await this.validateUser(user)) {
                console.log(user)
                data.ownerID=user.id;
                for(let i=0;i<files.length;i++)
                {
                    const imgLink = files[i].location;
                    const replaceLink = imgLink.replace("stay-cdn.s3.amazonaws.com","stay.cdn.coronasafe.network");
                    imgUrls.push(replaceLink);
                }
                return this.facilityRepository.createFacility(data,user.id,imgUrls);

                
            }
            else{
                throw new HttpException("Action Forbidden",HttpStatus.FORBIDDEN);
            }
        
        
    }

    async getAllFacility(): Promise<any> {
        return this.facilityRepository.getAllFacility();
    }
   

    async getFacility(user:User): Promise<any> {
   
            if(await this.validateUser(user)){
        const facility = await this.facilityRepository.find({ ownerID:user.id })
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
    async deleteFacility(user:User,id:number):Promise<any> {
            if(await this.findHotel(user,id)){
            const facility = await this.facilityRepository.findOne({ id:id })
            if(facility){
            facility.status = "NOT_AVAILABLE"
            await this.facilityRepository.save(facility);
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
        }
       

    }
    async updateFacility(user:User,id:number,data:UpdateFacilityDto): Promise <any> {
        if(await this.findHotel(user,id)){
        const facility = await this.facilityRepository.findOne({id:id })
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
}
    async searchDistrict(data:any): Promise<any> {
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
