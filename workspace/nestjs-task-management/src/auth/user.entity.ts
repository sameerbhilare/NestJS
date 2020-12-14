import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  async validatePassword(password: string): Promise<boolean> {
    // create hash of incoming password using salt of the user in db
    const hash = await bcrypt.hash(password, this.salt);
    // if hash is equal return true
    return hash === this.password;
  }
}
