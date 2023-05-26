import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './Dtos/createUser.dto';

@Controller('user')
export class UserController {
  @Get()
  public async getAllUsers() {
    return { message: 'Get all users' };
  }

  @Post()
  public async createUser(@Body() createUser: CreateUserDTO) {
    return {
      message: 'Create user',
      ...createUser,
      password: '**********',
    };
  }
}
