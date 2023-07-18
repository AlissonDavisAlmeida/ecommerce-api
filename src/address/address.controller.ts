import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDTO } from "./dtos/CreateAddress.dto";

@Controller("address")
export class AddressController {

  constructor(
        private readonly addressService: AddressService
  ) { }

    @Post("/:userId")
    @UsePipes(ValidationPipe)
  async createAddress(
        @Body() createAddress: CreateAddressDTO,
        @Param("userId") userId: number,
  ) {
    return await this.addressService.createAddress(createAddress, userId);
  }
}
