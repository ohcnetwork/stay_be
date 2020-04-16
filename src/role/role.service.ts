import { Injectable,Logger, NotFoundException , HttpException, HttpStatus } from '@nestjs/common';
import { RoleRepository } from './role.repository'; 
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
    private logger = new Logger('Role Service');
    constructor(
   @InjectRepository(RoleRepository)
   private readonly roleRepository: RoleRepository){}
   
   async getAllRoles(req: any): Promise<any> {
    return this.roleRepository.getAllRoles();
   }
    async addRole(data:any): Promise<any> {
            const role1 = await this.roleRepository.getById(data.userId)
            console.log(role1)
            if(!role1) {
                data.status='ACTIVE'
                const addRole= await this.roleRepository.save(data);
                const {...result } = addRole;
                return {
                    success:true,
                    message: 'added role to user',
                    data:result
                };

            }
            else{
                throw new HttpException("user exists",HttpStatus.FORBIDDEN);
            }
    }
    async getUserRole(id:number): Promise<any> {
        const user = await this.roleRepository.getById(id)
        console.log(user)
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
        const user = await this.roleRepository.getById(id)
        if(user) {
            await this.roleRepository.delete(user);
            return {
                success:true,
                message: "Deleted Successfully"
            }
        }
        else {
            throw new HttpException("user does not exist",HttpStatus.FORBIDDEN);
        }
    }
}
