import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enums/user-role.enum";

export const userEntityMock: UserEntity = {
  cpf: "12345678910",
  created_at: new Date(),
  email: "mock@email.com",
  id: 1,
  name: "Mock User",
  password: "mockPassword",
  phone: "12345678910",
  type_user: UserType.User,
  updated_at: new Date(),
  address: [],
};