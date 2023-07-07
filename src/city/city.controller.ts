import { Controller, Get, Param } from "@nestjs/common";
import { CityService } from "./city.service";

@Controller("city")
export class CityController {

  constructor(
        private readonly cityService: CityService
  ) { }

    @Get("/:state_id")
  async getAllCitiesByStateID(@Param("state_id") state_id: number) {
    return await this.cityService.getAllCitiesByStateID(state_id);
  }
}
