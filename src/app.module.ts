import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {DbConfig} from './config/db.config'
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { FacilityController } from './facility/facility.controller';
import { FacilityModule } from './facility/facility.module';

@Module({
  imports: [
    AuthModule,
    FacilityModule,
    TypeOrmModule.forRoot(DbConfig),
  ],
  controllers: [AuthController,FacilityController],
  providers: [],
})
export class AppModule {}
