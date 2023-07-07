import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
  constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) { }

  async getCache<T>(key: string, callback: () => Promise<T>): Promise<T> {

    const value = await this.cacheManager.get<T>(key);
    
    if (value) {
      return value;
    }

    const entity = await callback();

    await this.cacheManager.set(key, entity);
    
    return entity;

  }
}
