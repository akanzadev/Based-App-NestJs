import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return 'this.usersService.findAll()';
  }
}
