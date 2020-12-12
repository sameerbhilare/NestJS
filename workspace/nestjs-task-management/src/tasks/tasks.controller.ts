import { Controller, Get } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

/*
    Tells NestJS which route should be handled by this controller.
    In this case and incoming request to '/tasks' route will be handled by this controller.

    Controllers job is to accept request and return response. In beteen job is handled by the service.
*/
@Controller('tasks')
export class TasksController {
  /*
    Injecting TaskService into this controller.
    NestJS is going to look for a TaskService object. 
    And again there is only one object (Singleton) that is circulating throughout this module.
    It's going to find it or create it if it does not exist already 
    And then it's going to assign it as an argument to this constructor.
    And by prefixing this one with 'private', creates a private property in our class with the name 'taskService'.
    So any other method within our class can access the service object using 'this.taskService'.
  */
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
}
