import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDTO } from "./dtos/CreateAddress.dto";
import { Roles } from "src/decorators/role.decorator";
import { UserType } from "src/user/enums/user-role.enum";
import { UserId } from "src/decorators/user-id.decorator";

@Controller("address")
export class AddressController {

  constructor(
        private readonly addressService: AddressService
  ) { }

    @Post("/")
    @Roles(UserType.User)
    @UsePipes(ValidationPipe)
  async createAddress(
        @Body() createAddress: CreateAddressDTO,
        @UserId() userId: number,
  ) {
    return await this.addressService.createAddress(createAddress, userId);
  }
}
