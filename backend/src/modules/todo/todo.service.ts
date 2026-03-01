import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todo.entity';
import { TodoDto } from './todo.dto';
import User from 'src/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private TodoRepository: Repository<Todo>,
    @InjectRepository(User)
    private UserRepository: Repository<User>
  ) {}

  async create(createTodoDto: TodoDto): Promise<Todo> {
  const user = await this.UserRepository.findOneBy({
    id: createTodoDto.userId,
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const todo = this.TodoRepository.create({
    todoname: createTodoDto.todoname,
    description: createTodoDto.description,
    isCompleted: createTodoDto.isCompleted,
    user: user,
  });

  return this.TodoRepository.save(todo);
}

  async findAll(): Promise<Todo[]> {
    return this.TodoRepository.find();
  }

  async findByUser(userId: number): Promise<Todo[]> {
    return this.TodoRepository.find({
      where: {
        isCompleted: false,
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.TodoRepository.delete(id);
  }
  async update(id: number, isCompleted: boolean): Promise<Todo> {
  const todo = await this.TodoRepository.findOne({
    where: { id },
  });

  if (!todo) {
    throw new NotFoundException(`Todo with id ${id} not found`);
  }

  todo.isCompleted = isCompleted;

  return await this.TodoRepository.save(todo);
}
}
