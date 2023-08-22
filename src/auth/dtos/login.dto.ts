import { IsString } from "class-validator";
import { type } from "os";
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
  typeUser: number;

  constructor(user: UserEntity) {
    this.email = user.email;
    this.sub = `${user.id}`;
    this.typeUser = user.type_user;
  }

  toJson() {
    return {
      email: this.email,
      sub: this.sub,
      typeUser: this.typeUser,
    };
  }
}