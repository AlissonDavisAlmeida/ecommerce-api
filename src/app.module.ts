import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./database/db-config";
import { envFilePath } from "./utils/constants";
import { StateModule } from "./state/state.module";
import { CityModule } from "./city/city.module";
import { AddressModule } from "./address/address.module";
import { CacheModule } from "./cache/cache.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    TypeOrmModule.forRoot({
      ...databaseConfig(),
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      migrations: ["dist/database/migrations/*{.ts,.js}"],
      migrationsRun: true,

    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
