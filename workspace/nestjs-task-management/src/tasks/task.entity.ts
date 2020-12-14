import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';

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
}
