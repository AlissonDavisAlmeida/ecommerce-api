import { DataSourceOptions } from "typeorm";

export const databaseConfig = (): DataSourceOptions => (
  {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    type: "postgres",
  }
);