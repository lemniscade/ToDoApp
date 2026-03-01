import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get("all")
  findAll() {
    return this.userService.findAll();
  }

  @Get("user/:username")
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Delete("delete/:id")
  remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}