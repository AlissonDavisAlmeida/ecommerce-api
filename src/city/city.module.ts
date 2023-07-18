import { Module } from "@nestjs/common";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityEntity } from "./entities/city.entity";
import { CacheModule } from "src/cache/cache.module";

@Module({
  providers: [CityService],
  controllers: [CityController],
  imports: [
    TypeOrmModule.forFeature([CityEntity]),
    CacheModule,
  ],
  exports: [CityService],
})
export class CityModule { }
