import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

/*
    This tells the TypeORM that this repository is a repository for Tasks.
*/
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
