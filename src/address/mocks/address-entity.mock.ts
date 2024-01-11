import { cityEntityMock } from "../../city/mocks/city-entity.mock";
import { type AddressEntity } from "../entities/address.entity";

export const addressEntityMock: AddressEntity = {
  id: 1,
  addressNumber: 123,
  cep: "12345678",
  complement: "complement",
  city_id: cityEntityMock.id,
  user_id: 1,
  created_at: new Date(),
  updated_at: new Date(),

};