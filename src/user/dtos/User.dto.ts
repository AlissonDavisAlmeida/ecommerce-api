import { IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class CreateUserDTO {
  @IsString()
    name: string;
  @IsString()
    email: string;
  @IsString()
    phone: string;
  @IsString()
    cpf: string;
  @IsString()
    password: string;
}

export class OutputUserDTO {

  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;

  constructor(
    userEntity: UserEntity
  ) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
  }

}