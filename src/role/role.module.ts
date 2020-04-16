import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/Role.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Role, RoleRepository]),
    ],
    controllers:[RoleController],
    providers:[RoleService],
    exports:[RoleService]
})
export class RoleModule {}
