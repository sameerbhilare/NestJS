import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

/*
    Tells NestJS which route should be handled by this controller.
    In this case and incoming request to '/tasks' route will be handled by this controller.

    Controllers job is to accept request and return response. In beteen job is handled by the service.
*/
@Controller('tasks')
@UseGuards(AuthGuard()) // to guard entire controller, i.e. to allow only authorized access.
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
  getTasks(
    @Query(ValidationPipe) filterDTO: GetTasksFilterDTO,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDTO);
  }

  /*
    Get Task by Id.
    Using path param.
    Using ParseIntPipe to parse string to number.
  */
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  /*
  Two ways to extract information from request body
    1. Using @Body decorator to get entire request body.
       So when an HTTP request comes in, NestJS will make the request body
       available to use on the declared parameter.
       e.g. createTask(@Body() body) {...}

    2. Using @Body decorator with specific parameters
       So when an HTTP request comes in, NestJS will bind the mentioned parameter from request body
       to the declared parameter.
       e.g. createTask(@Body('title') title: string, @Body('description') description: string ) {..}

  Using pipes -
    NestJS validation pipe is smart enough.
    It's going to take the entire request body which is using a DTO
    and validate the data against that DTO using the class-validator decorators
    that we specified in the DTO
  */
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  /*
    Delete Task by Id.
    Using path param.
    Using ParseIntPipe to parse string to number.
  */
  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  /*
    Update Task Status by Id
  */
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }
}
