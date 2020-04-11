import { Injectable,Logger, NotFoundException } from '@nestjs/common';
import { StayRepository } from './stay.repository'; 
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StayService {
    private logger = new Logger('Stay Controller');
    constructor(
   @InjectRepository(StayRepository)
   private readonly stayRepository: StayRepository){}
   gethello(): string { //to just see that it works
        return 'Welcome to stay service';
    }
    

    async addStay(data:any): Promise<any> {
        try {
            const stay = await this.stayRepository.findOne({ name:data.name });
            if(!stay) {
                data.status = 'ACTIVE';
                const registerStay = await this.stayRepository.save(data);
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
                message: 'Something went wrong adding stay failed'
            }
        }
        
    }

    async updateRooms(data:any):Promise<any> {
        try {
            const stay = await this.stayRepository.findOne({ id:data.id });
            if(!stay){
                data.Status = 'ACTIVE';
                stay.rooms_Available=data.rooms_Available;
                const { name, ...result } = stay;
                return {
                    success:true,
                    message:'Success',
                    data:result,
                }
            }
        } catch(e){
            throw new NotFoundException('Could not find the Stay');
        }
    }
    async getAllStay(req: any): Promise<any> {
        return this.stayRepository.getAllStay();
    }

    async deleteRooms(data:any):Promise<any> {
        try{
            const stay = await this.stayRepository.findOne({ id:data.id })
            this.stayRepository.delete(stay);
        } catch(e) {
            return {
                success: false,
                message: 'Deletion Failed',
            }
        }

    }
}
