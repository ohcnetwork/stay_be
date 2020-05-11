import { Module } from '@nestjs/common';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';
import { FacilityRepository } from './facility.repository'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './entities/Facility.entity';
import { UserRepository } from 'src/auth/user.repository';
import { RoomRepository } from 'src/rooms/room.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([Facility, FacilityRepository]),
        TypeOrmModule.forFeature([UserRepository]),
        TypeOrmModule.forFeature([RoomRepository]),
    ],
    controllers:[FacilityController],
    providers:[FacilityService],
    exports:[FacilityService]
})
export class FacilityModule {}
