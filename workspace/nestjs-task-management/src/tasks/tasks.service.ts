import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

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
  async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDTO, user);
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
  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

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
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    // USING REPOSITORY
    return this.taskRepository.createTask(createTaskDto, user);
  }

  /*
    Delete a task by Id
  */
  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    //console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
  }

  /*
    Update task in DB
  */
  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
