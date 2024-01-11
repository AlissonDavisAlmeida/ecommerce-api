import { CityEntity } from "./entities/city.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CacheService } from "../cache/cache.service";
import { CityService } from "./city.service";
import { cityEntityMock } from "./mocks/city-entity.mock";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("CityService", () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityEntityMock]),
          },
        },
        CityService,
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
      ],
    }).compile();
    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it("should return an array of cities", async () => {
    const result = cityEntityMock;
    const finOneSpy = jest.spyOn(cityRepository, "findOne");
    expect(await service.getCityById(cityEntityMock.id)).toBe(result);
    expect(finOneSpy).toBeCalledWith({ where: { id: 1 } });
  });

  it("should throw an error if city not found", async () => {
    jest.spyOn(cityRepository, "findOne").mockResolvedValue(undefined);
    await expect(service.getCityById(1)).rejects.toThrow(new HttpException("City not found", HttpStatus.NOT_FOUND));
  });

  it("should return all cities by state id", async () => {
    const result = [cityEntityMock];
    const getCacheSpy = jest.spyOn(service["cacheService"], "getCache");

    await expect(service.getAllCitiesByStateID(cityEntityMock.state_id)).resolves.toEqual(result);
    expect(getCacheSpy).toBeCalledWith("state_1", expect.any(Function));
  });

});
