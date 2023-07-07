import { Module } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { CacheModule as ModuleCache } from "@nestjs/cache-manager";

@Module({
  imports: [
    ModuleCache.register({
      ttl: 1000 * 60 * 60, // 1 hour

    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
