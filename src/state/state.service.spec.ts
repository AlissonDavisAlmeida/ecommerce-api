import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StateService } from "./state.service";
import { stateEntityMock } from "./mocks/state-entity.mock";
import { StateEntity } from "./entities/state.entity";

jest.mock("../city/entities/city.entity.ts");
describe("StateService", () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,

        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn().mockResolvedValue([stateEntityMock]),

          },
        },
      ],
    }).compile();
    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(getRepositoryToken(StateEntity));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it("should return all states", async () => {
    const states = await service.getAllStates();
    expect(states).toEqual([stateEntityMock]);
  });

  it("should return an error when throws an exception", async () => {
    jest.spyOn(stateRepository, "find").mockRejectedValue(new Error());
    await expect(service.getAllStates()).rejects.toThrow(new Error());

  });

});
