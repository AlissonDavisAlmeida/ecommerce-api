import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "../cache/cache.module";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";
import { CityEntity } from "./entities/city.entity";

@Module({
  providers: [CityService],
  controllers: [CityController],
  imports: [
    CacheModule,
    TypeOrmModule.forFeature([CityEntity]),
  ],
  exports: [CityService],
})
export class CityModule { }
