import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

/*
    This tells the TypeORM that this repository is a repository for Tasks.
*/
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // logger
  private logger = new Logger('TaskRepository');

  // Create Task in DB
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
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
    task.user = user;

    // saving the entity into database
    try {
      await task.save();
    } catch (error) {
      // printing error stacktrace in case of errors by passing second arg to .error() as error.stack
      this.logger.error(
        `Failed to create a task for user ${
          user.username
        }. Data: ${JSON.stringify(createTaskDto)}`,
        error.stack, // stack trace
      );
      throw new InternalServerErrorException();
    }

    // removes the user property from task object to avoid sending entire user object to frontend
    // this doesn't delete from database
    delete task.user;

    return task;
  }

  // get tasks
  async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDTO;

    // USING QUERY BUILDER
    // the query builder is a mechanism that is useful for interacting with a database
    // when our desired operations are a bit more complex than usual
    const query = this.createQueryBuilder('task'); // providing alias for later use

    query.where('task.userId = :userId', { userId: user.id });

    // using addWhere() instead of just where().
    // addWhere() will append where clauses. Just where() will overwrite existing where clauses.
    if (status) {
      query.andWhere('task.status = :dbStatus', { dbStatus: status });
    }

    if (search) {
      query.andWhere(
        // wrap in brackets ( & ) since it's an OR condition
        '(task.title LIKE :dbSearch OR task.description LIKE :dbSearch)',
        // as per TypeORM documentation wrapping value in % signs for partial match just like in Oracle.
        { dbSearch: `%${search}%` },
      );
    }

    try {
      return await query.getMany();
    } catch (error) {
      // printing error stacktrace in case of errors by passing second arg to .error() as error.stack
      this.logger.error(
        `Failed to get tasks for user ${
          user.username
        }. Filters: ${JSON.stringify(filterDTO)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
