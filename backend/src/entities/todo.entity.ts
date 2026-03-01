import User from './user.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50})
  todoname: string;

  @Column({ length: 150})
  description: string;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => Todo, todo => todo.user)
  @JoinColumn()
  user: User;
}