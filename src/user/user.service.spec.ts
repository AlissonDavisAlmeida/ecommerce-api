import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { Environment } from "../utils/types";
import { Repository } from "typeorm";
import { userEntityMock } from "./mocks/user.mock";
import { HttpException, NotFoundException } from "@nestjs/common";
import { OutputUserWithAddressDTO } from "./dtos/User.dto";

describe("UserService", () => {
  let service: UserService;
  let userEntityRepository: Repository<UserEntity>;
  let configServiceMock: jest.Mock<ConfigService<Environment>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userEntityRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(userEntityRepository).toBeDefined();
  });

  it("should returns user in method findUserByEmail", async () => {
    const user = await service.findByEmail(userEntityMock.email);
    expect(user).toBeDefined();
    expect(user).toEqual(userEntityMock);
  });

  it("should returns an error when not find user by email", async () => {
    const findOneSpy = jest.spyOn(userEntityRepository, "findOne").mockResolvedValueOnce(undefined);
    await expect(service.findByEmail(userEntityMock.email)).rejects.toThrowError(NotFoundException);
    expect(findOneSpy).toBeCalledTimes(1);
  });
  it("should returns an error when throws", async () => {
    const findOneSpy = jest.spyOn(userEntityRepository, "findOne").mockRejectedValueOnce(new Error());
    await expect(service.findByEmail(userEntityMock.email)).rejects.toThrowError();
    expect(findOneSpy).toBeCalledTimes(1);
  });

  it("should returns user in method getUserById", async () => {
    const user = await service.getUserById(userEntityMock.id);
    expect(user).toBeDefined();
    expect(user).toEqual(userEntityMock);
  });

  it("should returns an error when not find user by id", async () => {
    const findOneSpy = jest.spyOn(userEntityRepository, "findOne").mockResolvedValueOnce(undefined);
    await expect(service.getUserById(userEntityMock.id)).rejects.toThrowError(HttpException);
    expect(findOneSpy).toBeCalledTimes(1);
  });

  it("should returns user in method getUserByIdUsingReferences", async () => {
    const outputUser = await service.getUserByIdUsingReferences(userEntityMock.id);
    const expectedOutputUser = new OutputUserWithAddressDTO(userEntityMock);

    expect(outputUser).toBeDefined();
    expect(outputUser).toEqual(expectedOutputUser);

  });
});
 