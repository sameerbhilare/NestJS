import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

/*
    We will use the task service to contain any business logic related to tasks for now. 
    Any other component concerned about tasks for example 
    the controller is going to communicate with the task service.
*/
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks.slice(0); // returns copy of array starting from 0th position
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    // DS6 destructuting
    /*
      If you have an object that contains certain key value pairs, 
      you can use this syntax to only extract the keys you care about 
      and they will be available within the current scope.
    */
    const { title, description } = createTaskDto;

    // create task
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    // push it to tasks array
    this.tasks.push(task);

    // good practice to retun the newly created object to frontend as part of CREATE request
    return task;
  }

  deleteTaskById(id: string): void {
    // Approach 1: using findIndex and splice
    /*
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1);
    */

    // Approach 2: using filter
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
