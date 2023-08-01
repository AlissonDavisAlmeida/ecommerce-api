import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { OutputUserDTO } from "src/user/dtos/User.dto";
import { LoginDTO } from "./dtos/login.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {

  constructor(
        private readonly authService: AuthService
  ){}

    @UsePipes(ValidationPipe)
    @Post()
  async login(
        @Body() loginDTO: LoginDTO
  ): Promise<OutputUserDTO> {
    const user = await this.authService.login(loginDTO);

    return new OutputUserDTO(user);
  }
}
