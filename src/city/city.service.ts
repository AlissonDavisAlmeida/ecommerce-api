import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CityEntity } from "./entities/city.entity";
import { Repository } from "typeorm";
import { CacheService } from "src/cache/cache.service";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService
  ) { }

  async getAllCitiesByStateID(state_id: number) {

    return await this.cacheService.getCache<CityEntity[]>(`state_${state_id}`, async () => {

      return await this.cityRepository.findBy({ state_id });
    });

  }

  async getCityById(id: number) {
    const city = await this.cityRepository.findOne({
      where: { id },
    });

    if (!city) {
      throw new HttpException("City not found", HttpStatus.NOT_FOUND);
    }

    return city;
  }
}
