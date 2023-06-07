import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./Dtos/createUser.dto";
import { UserEntity } from "./interfaces/user.entity";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  public async createUser(createUser: CreateUserDTO): Promise<UserEntity> {

    const hashPassword = await bcrypt.hash(createUser.password, +this.configService.get<number>("SALT_OR_ROUNDS"));

    const user = await this.userRepository.save({
      ...createUser,
      password: hashPassword,
    });

    return {
      ...user,
      password: undefined,
    };
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select: ["id", "name", "email", "phone", "cpf"],
    });
  }
}
