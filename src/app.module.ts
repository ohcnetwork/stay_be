import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {DbConfig} from './config/db.config'
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { StayController } from './stay/stay.controller';
import { StayModule } from './stay/stay.module';

@Module({
  imports: [
    AuthModule,
    StayController,
    TypeOrmModule.forRoot(DbConfig),
  ],
  controllers: [AuthController,StayController],
  providers: [],
})
export class AppModule {}
