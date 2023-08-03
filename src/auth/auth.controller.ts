import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginDTO, LoginResponse } from "./dtos/login.dto";
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
  ): Promise<LoginResponse> {
    return await this.authService.login(loginDTO);

  }
}
