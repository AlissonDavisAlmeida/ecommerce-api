import { stateEntityMock } from "../../state/mocks/state-entity.mock";
import { type CityEntity } from "../entities/city.entity";

export const cityEntityMock: CityEntity = {
  name: "São Paulo",
  created_at: new Date(),
  updated_at: new Date(),
  id: 1,
  state_id: stateEntityMock.id,

};