import { StateEntity } from "../entities/state.entity";

export class StateDTO {
  name: string;

  constructor(state: StateEntity){
    this.name = state.name;
  }
}