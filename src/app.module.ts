import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./database/db-config";
import { envFilePath } from "./utils/constants";

@Module({
  imports: [
    UserModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
