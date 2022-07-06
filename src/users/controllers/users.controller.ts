import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Public } from 'src/auth/decorators';
import { multerOptions } from '../../common/helper/multer.config';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user witch Image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        name: { type: 'string' },
        lastname: { type: 'string' },
        phone: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
        password: { type: 'string' },
      },
    },
  })
  @Post('createWithImage')
  @UseInterceptors(FilesInterceptor('image', 1, multerOptions))
  createWithImage(
    @Body() user: CreateUserDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.usersService.createWithImage(user, files);
  }

  @ApiOperation({ summary: 'Create a user' })
  @Post('create')
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Find all users' }) // , required admin role
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find a user by id' })
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Public()
  @ApiOperation({ summary: 'Delete a user' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
