import { StateDTO } from "src/state/dtos/State.dto";
import { CityEntity } from "../entities/city.entity";

export class CityDTO {
  name: string;
    
  state?: StateDTO;

  constructor(city: CityEntity){
    this.name = city.name;
    this.state = !!city.state && new StateDTO(city.state);
  }
}