
import { Injectable,Logger, HttpException, HttpStatus, ParseIntPipe, UnauthorizedException, NotFoundException} from '@nestjs/common';

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
        if((found.type === 'facilityowner')||(found.type === 'admin')){
            return found
        }
        else {
            throw new UnauthorizedException('You are not authorized!!');
        }
    }

    async findHotel(user:User,id:any): Promise<any>{
        const found =await this.userRepository.findOne({id:user.id})
        const hotel = await this.facilityRepository.findOne({id:id})
        console.log(hotel)
        console.log(found)
        if((found.type === 'facilityowner' && hotel.ownerID === found.id)||(found.type === 'admin')){
            return found
        }
        else {
            throw new UnauthorizedException;
        }
    }
   async addfacility(data:any,user:User,files:any): Promise<any> {
        try{
                const imgUrls=[];
                const coronasafe_cdn = process.env.CDN_URL;
                const s3Urls = process.env.S3_URLS.split(",");
                let replaceLink;
                if(await this.validateUser(user))
                {
                    data.ownerID=user.id;
                    if(files)
                    {
                        for(let i=0;i<files.length;i++)
                        {
                            const imgLink = files[i].location;
                            for(const k in s3Urls)
                            {
                                if(imgLink.includes(s3Urls[k]))
                                {
                                    replaceLink = imgLink.replace(s3Urls[k],coronasafe_cdn);
                                    imgUrls.push(replaceLink);
                                }
                            }
    
                        }
                    }
                    return this.facilityRepository.createFacility(data,user.id,imgUrls);
                }
                else
                {
                    throw new HttpException("Action Forbidden",HttpStatus.FORBIDDEN);
                }
            
            } catch(e)
            {
                return e;
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

    async getFacilityById(id:number):Promise<any>{

            const facility = await this.facilityRepository.findOne({id});
            if(facility)
            {
                return facility;
            }
            else {
                throw new NotFoundException("No Such Facility")
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
    async updateFacility(user:User,id:number,data:any): Promise <any> {
        const  L=['Thiruvananthapuram','Ernakulam','Kollam','Kannur','Kozhikode','Kottayam','Thrissur','Idukki','Malappuram','Palakkad','Kasaragod','Alappuzha','Pathanamthitta','Wayanad']
        if(await this.findHotel(user,id)){
        const facility = await this.facilityRepository.findOne({id:id })
        if(facility){
            if(data.name) {
                facility.name=data.name
            }
            if(data.facilities==="" || data.facilities) {
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
            if(data.panchayath===null || data.panchayath){
                facility.panchayath = data.panchayath
            }
            if(data.district){
                if(L.includes(data.district)){
                    facility.district=data.district
                }
            }
            if(data.policy){
                facility.policy=data.policy;
            }
            if(data.starCategory===null || data.starCategory){
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

