import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

/*
    We will use the task service to contain any business logic related to tasks for now. 
    Any other component concerned about tasks for example 
    the controller is going to communicate with the task service.
*/
@Injectable()
export class TasksService {
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks.slice(0); // returns copy of array starting from 0th position
  // }
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
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   /*
  //     NestJS provides us with a set of exceptions we can throw that represent different HTTP error codes.
  //     Since this is not caught in service or in controller, it will be sent back to the client.
  //     But NestJS behind the scenes will beautifully format it and then send it back to the client.
  //   */
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found!`);
  //   }
  //   return found;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   // DS6 destructuting
  //   /*
  //     If you have an object that contains certain key value pairs,
  //     you can use this syntax to only extract the keys you care about
  //     and they will be available within the current scope.
  //   */
  //   const { title, description } = createTaskDto;
  //   // create task
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   // push it to tasks array
  //   this.tasks.push(task);
  //   // good practice to retun the newly created object to frontend as part of CREATE request
  //   return task;
  // }
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   // Approach 1: using findIndex and splice
  //   /*
  //   const index = this.tasks.findIndex((task) => task.id === found.id);
  //   this.tasks.splice(index, 1);
  //   */
  //   // Approach 2: using filter
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   if (task) {
  //     task.status = status;
  //   }
  //   return task;
  // }
}
