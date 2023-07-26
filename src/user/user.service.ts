import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDTO, OutputUserDTO, OutputUserWithAddressDTO } from "./dtos/User.dto";
import { UserEntity } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Environment } from "src/utils/types";

@Injectable()
export class UserService {

  constructor(
    private configService: ConfigService<Environment>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  public async createUser(createUser: CreateUserDTO): Promise<OutputUserDTO> {

    const hashPassword = await bcrypt.hash(createUser.password, +this.configService.get("SALT_OR_ROUNDS"));

    const user = await this.userRepository.save({
      ...createUser,
      type_user: 1,
      password: hashPassword,
    });

    const outputUserDto = new OutputUserDTO(user);

    return outputUserDto;
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select: ["id", "name", "email", "phone", "type_user", "created_at", "updated_at"],
    });
  }

  public async getUserByIdUsingReferences(id: number): Promise<OutputUserDTO> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        address: {
          city: {
            state: true,
          },
        },
      },
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const outputUser = new OutputUserWithAddressDTO(user);

    return outputUser;
  }

  public async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
