import {Injectable, Logger, NotFoundException, HttpException, HttpStatus, UnauthorizedException} from '@nestjs/common';
import { RoleRepository } from './role.repository'; 
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';

@Injectable()
export class RoleService {
    private logger = new Logger('Role Service');
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository:UserRepository,
   @InjectRepository(RoleRepository)
   private readonly roleRepository: RoleRepository){}
   
   async getAllRoles(req: any): Promise<any> {
    return this.roleRepository.getAllRoles();
   }
    async addRole(data:any): Promise<any> {

                data.status='ACTIVE'
                const addRole= await this.roleRepository.save(data);
                const {...result } = addRole;
                return {
                    success:true,
                    message: 'added role to user',
                    data:result
                };
    }
    async getUserRole(id:number): Promise<any> {
        const user = await this.roleRepository.getByUserId(id)
        console.log(user)
        const user1 = await this.userRepository.findOne({id:id})
        console.log(user1)
        if(user) {
            const {...result} = user;
            return {
                success:true,
                data: result
            }
        }
        else {
            throw new HttpException("user does not exist",HttpStatus.FORBIDDEN);
        }
    }
    async deleteRole(id:number): Promise<any> {
        const user = await this.roleRepository.findOne({id:id})
        if(user) {
            await this.roleRepository.delete(user);
            return {
                success:true,
                message: "Deleted Successfully"
            }
        }
        else {
            throw new HttpException("such an id does not exist",HttpStatus.FORBIDDEN);
        }
    }
    async updateRole(id:number,body:any): Promise<any>{
        const user = await this.roleRepository.findOne({id:id})
        if(user){
        if(body.userId){
            user.userId = body.userId;
        }
        if(body.facilityId){
            user.facilityId = body.facilityId;
        }
        if(body.role){
            user.role = body.role;
        }
        await this.roleRepository.save(user);
        return {
            success:true,
            message:'Update Successfull'
        }
    } else {
        throw new HttpException("such an id does not exist",HttpStatus.FORBIDDEN);
    }

}


async checkRole(userId: number, type: string, facilityId: number): Promise<Boolean> {
    {}
    throw new UnauthorizedException(' User not authorized to perform this action')
}
}
