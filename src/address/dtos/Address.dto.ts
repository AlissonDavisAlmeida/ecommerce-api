import { AddressEntity } from "../entities/address.entity";
import { CityDTO } from "../../city/dtos/City.dto";

export class AddressDTO {
  complement: string;
  addressNumber: number;
  cep: string;
  city: CityDTO;

  constructor(address: AddressEntity){
    this.complement = address.complement;
    this.addressNumber = address.addressNumber;
    this.cep = address.cep;

    this.city = !!address.city && new CityDTO(address.city);
    
  }
}

