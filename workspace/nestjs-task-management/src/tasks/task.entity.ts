import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
  /*
        PrimaryGeneratedColumn tells TypeORM that this is a primary key column 
        and that the ID should be automatically generated and incremented whenever we create a new task.
    */
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // only one side of the relationship can be eager. Since user.tasks has eager: true, here we use eager: false
  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  user: User;

  // bcz of above M-1 relationship, TypeORM creates 'userId' column for us in Task table.
  // Hence we need to provide this mapping
  @Column()
  userId: number;
}
