import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDTO, OutputUserDTO } from "./dtos/User.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {

  constructor(
    private userService: UserService
  ) { }

  @Get()
  public async getAllUsers() {
    const users = await this.userService.getAllUsers();

    const outputUsers = users.map(user => new OutputUserDTO(user));

    return outputUsers;
  }

  @UsePipes(ValidationPipe)
  @Post()
  public async createUser(@Body() createUser: CreateUserDTO) {
    try {

      return await this.userService.createUser(createUser);
    } catch (error) {
      return JSON.stringify(error.detail);
    }
  }
}
