import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressEntity } from "./entities/address.entity";
import { Repository } from "typeorm";
import { CreateAddressDTO } from "./dtos/CreateAddress.dto";

@Injectable()
export class AddressService {

  constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>
  ) { }

  async createAddress(createAddress: CreateAddressDTO, user_id: number) {
    try {

      const addressSaved = await this.addressRepository.save({
        ...createAddress,
        user_id,
      });

      return addressSaved;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
