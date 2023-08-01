import { Injectable, NotFoundException } from "@nestjs/common";
import { LoginDTO } from "./dtos/login.dto";
import { UserService } from "src/user/user.service";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {

  constructor(
        private readonly userService: UserService,
  ) { }

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.findByEmail(loginDTO.email)
      .catch(() => {
        console.log("User not found");
      });

    if (!user) {
      throw new NotFoundException("Invalid Email");
    }

    const isPasswordValid = await compare(loginDTO.password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException("Invalid Password");
    }

    return user;

  }
}
