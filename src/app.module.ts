import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {DbConfig} from './config/db.config'
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(DbConfig),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
