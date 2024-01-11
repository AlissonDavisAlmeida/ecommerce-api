import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressModule } from "./address/address.module";
import { AuthModule } from "./auth/auth.module";
import { CacheModule } from "./cache/cache.module";
import { CityModule } from "./city/city.module";
import { databaseConfig } from "./database/db-config";
import { RolesGuard } from "./guards/roles.guard";
import { StateModule } from "./state/state.module";
import { UserModule } from "./user/user.module";
import { envFilePath } from "./utils/constants";

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
      autoLoadEntities: true,

    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
