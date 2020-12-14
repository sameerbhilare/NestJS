import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

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
}
