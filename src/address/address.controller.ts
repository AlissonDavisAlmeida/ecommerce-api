import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDTO } from "./dtos/CreateAddress.dto";
import { Roles } from "src/decorators/role.decorators";
import { UserType } from "src/user/enums/user-role.enum";

@Controller("address")
export class AddressController {

  constructor(
        private readonly addressService: AddressService
  ) { }

    @Post("/:userId")
    @Roles(UserType.User)
    @UsePipes(ValidationPipe)
  async createAddress(
        @Body() createAddress: CreateAddressDTO,
        @Param("userId") userId: number,
  ) {
    return await this.addressService.createAddress(createAddress, userId);
  }
}
