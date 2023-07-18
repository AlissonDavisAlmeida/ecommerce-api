import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressEntity } from "./entities/address.entity";
import { Repository } from "typeorm";
import { CreateAddressDTO } from "./dtos/CreateAddress.dto";
import { UserService } from "src/user/user.service";
import { CityService } from "src/city/city.service";

@Injectable()
export class AddressService {

  constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService
  ) { }

  async createAddress(createAddress: CreateAddressDTO, user_id: number) {

    await this.userService.getUserById(user_id);
    await this.cityService.getCityById(createAddress.city_id);

    const addressSaved = await this.addressRepository.save({
      ...createAddress,
      user_id,
    });

    return addressSaved;
    
  }
}
