import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {DbConfig} from './config/db.config'
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { FacilityController } from './facility/facility.controller';
import { FacilityModule } from './facility/facility.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsController } from './rooms/rooms.controller';
import { FeedbackModule } from './feedback/feedback.module';
import { FeedbackController } from './feedback/feedback.controller';

@Module({
  imports: [
    AuthModule,
    FacilityModule,
    RoomsModule,
    TypeOrmModule.forRoot(DbConfig),
    FeedbackModule,
  ],
  controllers: [AuthController,FacilityController,RoomsController,FeedbackController],
  providers: [],
})
export class AppModule {}
