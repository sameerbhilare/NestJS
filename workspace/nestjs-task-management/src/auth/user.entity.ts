import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Task } from 'src/tasks/task.entity';

@Entity()
@Unique(['username']) // pass array of column names which should be unique.
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    // create hash of incoming password using salt of the user in db
    const hash = await bcrypt.hash(password, this.salt);
    // if hash is equal return true
    return hash === this.password;
  }
}
