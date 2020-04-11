import { Module } from '@nestjs/common';
import { StayController } from './stay.controller';
import { StayService } from './stay.service';
import { StayRepository } from './stay.repository'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stay } from './entities/Stay.entity';
import * as config from 'config';

@Module({
    imports:[
        TypeOrmModule.forFeature([Stay, StayRepository]),
    ],
    controllers:[StayController],
    providers:[StayService],
    exports:[StayService]
})
export class StayModule {}
