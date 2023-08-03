import { IsString } from "class-validator";
import { OutputUserDTO } from "src/user/dtos/User.dto";
import { UserEntity } from "src/user/entities/user.entity";

export class LoginDTO {
  @IsString()
    email: string;
  @IsString()
    password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: OutputUserDTO;
}

export class JwtPayload {
  email: string;
  sub: string;

  constructor(user: UserEntity) {
    this.email = user.email;
    this.sub = `${user.id}`;
  }

  toJson() {
    return {
      email: this.email,
      sub: this.sub,
    };
  }
}