import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from './todo.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50,unique: true })
  username: string;

  @Column({length:20})
  password: string;

  @Column()
  isLoggedIn: boolean;

  @OneToMany(() => User, user => user.todos)
  todos: Todo[];
}