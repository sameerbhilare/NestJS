import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

/*
    This tells the TypeORM that this repository is a repository for Tasks.
*/
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // Create Task in DB
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // DS6 destructuring
    /*
        If you have an object that contains certain key value pairs,
        you can use this syntax to only extract the keys you care about
        and they will be available within the current scope.
    */
    const { title, description } = createTaskDto;
    // creating the task
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    // saving the entity into database
    await task.save();

    return task;
  }
}
