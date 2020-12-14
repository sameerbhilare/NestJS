import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    /* 
      Passing array of repositories that we want to include in this Task Module.
      Since its not AppModule, so using forFeature() instead of forRoot().
      Below line makes the TypeOrmModule which comes from NestJS 
      include this TaskRepository instance injectable independency injection throughout this module.
    */
    TypeOrmModule.forFeature([TaskRepository]),
    // anything exported from AuthModule is available in TaskModule now
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
