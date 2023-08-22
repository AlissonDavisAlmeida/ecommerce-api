import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtPayload, LoginDTO, LoginResponse } from "./dtos/login.dto";
import { UserService } from "src/user/user.service";
import { compare } from "bcrypt";
import { OutputUserDTO } from "src/user/dtos/User.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
  ) { }

  async login(loginDTO: LoginDTO): Promise<LoginResponse> {
    const userEntity = await this.userService.findByEmail(loginDTO.email)
      .catch(() => {
        console.log("User not found");
      });

    if (!userEntity) {
      throw new NotFoundException("Invalid Email");
    }

    const isPasswordValid = await compare(loginDTO.password, userEntity.password);

    if (!isPasswordValid) {
      throw new NotFoundException("Invalid Password");
    }

    const user = new OutputUserDTO(userEntity);

    const payload = new JwtPayload(userEntity).toJson();

    const accessToken = this.jwtService.sign(payload,{secret: process.env.JWT_SECRET});

    return {
      accessToken,
      user,
    };

  }
}
