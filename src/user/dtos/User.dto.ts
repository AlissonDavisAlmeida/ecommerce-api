import { IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";
import { AddressDTO } from "../../address/dtos/Address.dto";

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

export class OutputUserWithAddressDTO extends OutputUserDTO {
  
  address: AddressDTO[];

  constructor(userEntity: UserEntity){
    super(userEntity);
    this.address = userEntity.address.map(address => new AddressDTO(address));
  }
  
}