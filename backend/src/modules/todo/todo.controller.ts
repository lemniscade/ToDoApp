import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  @Post("addTodo")
  create(@Body() TodoDto: TodoDto) {
    return this.TodoService.create(TodoDto);
  }

  @Get("all/:id")
  findByUser(@Param('id') id: string) {
    return this.TodoService.findByUser(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.TodoService.remove(Number(id));
  }
  
  @Put('update/:id')
  update(@Param('id') id: string, @Body() isCompleted: boolean) {
    return this.TodoService.update(Number(id), isCompleted);
  }
}