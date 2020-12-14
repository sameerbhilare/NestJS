import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    /* 
    Passing array of repositories that we want to include in this Auth Module.
    Since its not AppModule, so using forFeature() instead of forRoot().
    Below line makes the TypeOrmModule which comes from NestJS 
    include this UserRepository instance injectable independency injection throughout this module.
  */
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
