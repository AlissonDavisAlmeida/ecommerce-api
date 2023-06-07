import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDTO } from "./Dtos/createUser.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {

  constructor(
    private userService: UserService
  ){}

  @Get()
  public async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post()
  public async createUser(@Body() createUser: CreateUserDTO) {
    try{

      return await this.userService.createUser(createUser);
    }catch(error){
      return JSON.stringify(error.detail);
    }
  }
}
