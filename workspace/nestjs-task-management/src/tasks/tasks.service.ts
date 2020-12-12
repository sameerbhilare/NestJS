import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';

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

  createTask(title: string, description: string) {
    const task: Task = {
        title,
        description,
        status: TaskStatus.OPEN
    }
}
