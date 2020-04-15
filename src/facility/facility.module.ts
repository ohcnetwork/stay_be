import { Module } from '@nestjs/common';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';
import { FacilityRepository } from './facility.repository'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './entities/Facility.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Facility, FacilityRepository]),
    ],
    controllers:[FacilityController],
    providers:[FacilityService],
    exports:[FacilityService]
})
export class FacilityModule {}
