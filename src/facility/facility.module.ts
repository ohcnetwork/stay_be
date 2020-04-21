import { Module } from '@nestjs/common';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';
import { FacilityRepository } from './facility.repository'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './entities/Facility.entity';
import { UserRepository } from 'src/auth/user.repository';
import {CqrsModule} from "@nestjs/cqrs";
import {RoleCheckCommand} from "./cqrs/roleCheck.command";
import {RoleCheckCommandHandler} from "../role/cqrs/RoleCheck.command.handler";

@Module({
    imports:[
        TypeOrmModule.forFeature([Facility, FacilityRepository]),
        TypeOrmModule.forFeature([UserRepository]),
        CqrsModule
    ],
    controllers:[FacilityController],
    providers:[FacilityService, RoleCheckCommand, RoleCheckCommandHandler],
    exports:[FacilityService]
})
export class FacilityModule {}
