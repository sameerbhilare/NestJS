import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

/*
    We will use the task service to contain any business logic related to tasks for now. 
    Any other component concerned about tasks for example 
    the controller is going to communicate with the task service.
*/
@Injectable()
export class TasksService {
  // inject TaskRepository instance
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  // private tasks: Task[] = [];
  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDTO);
  }
  // getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
  //   const { status, search } = filterDTO;
  //   let filteredTasks = this.getAllTasks();
  //   if (status) {
  //     filteredTasks = this.tasks.filter((el) => el.status === status);
  //   }
  //   if (search) {
  //     filteredTasks = filteredTasks.filter(
  //       (el) => el.title.includes(search) || el.description.includes(search),
  //     );
  //   }
  //   return filteredTasks;
  // }

  /*
    Get Task by Id.
    Async method always returns Promise.
  */
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      /*
      NestJS provides us with a set of exceptions we can throw that represent different HTTP error codes.
      Since this is not caught in service or in controller, it will be sent back to the client.
      But NestJS behind the scenes will beautifully format it and then send it back to the client.
      */
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }

    return found;
  }

  /*
    Creating Task in DB
  */
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // USING REPOSITORY
    return this.taskRepository.createTask(createTaskDto);
  }

  /*
    Delete a task by Id
  */
  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    //console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
  }

  /*
    Update task in DB
  */
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
