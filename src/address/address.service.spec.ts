import { AddressEntity } from "./entities/address.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddressService } from "./address.service";
import { addressEntityMock } from "./mocks/address-entity.mock";
import { UserService } from "../user/user.service";
import { CityService } from "../city/city.service";

describe("CityService", () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressEntityMock),
          },
        },
        {
          provide: UserService,
          useValue:{
            getUserById: jest.fn().mockResolvedValue(addressEntityMock.user_id),
          },
        },
        {
          provide: CityService,
          useValue:{
            getCityById: jest.fn().mockResolvedValue(addressEntityMock.city_id),
          },
        },
      ],
    }).compile();
    service = module.get<AddressService>(AddressService);
    addressRepository = module.get<Repository<AddressEntity>>(getRepositoryToken(AddressEntity));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it("should create a new address", async () => {
    const saveSpy = jest.spyOn(addressRepository, "save");
    const address = await service.createAddress(addressEntityMock, addressEntityMock.user_id);
    expect(address).toEqual(addressEntityMock);
    expect(saveSpy).toHaveBeenCalledWith(addressEntityMock);
  });

  it("should throw an error if the user does not exist", async () => {
    const saveSpy = jest.spyOn(addressRepository, "save");
    const userServiceSpy = jest.spyOn(service["userService"], "getUserById").mockRejectedValue(new Error());
    await expect(service.createAddress(addressEntityMock, 999)).rejects.toThrow();
    expect(saveSpy).not.toHaveBeenCalled();
    expect(userServiceSpy).toHaveBeenCalledWith(999);
  });

  it("should throw an error if the city does not exist", async () => {
    const saveSpy = jest.spyOn(addressRepository, "save");
    const cityServiceSpy = jest.spyOn(service["cityService"], "getCityById").mockRejectedValue(new Error());
    await expect(service.createAddress(addressEntityMock, addressEntityMock.user_id)).rejects.toThrow();
    expect(saveSpy).not.toHaveBeenCalled();
    expect(cityServiceSpy).toHaveBeenCalledWith(addressEntityMock.city_id);
  });

});
