import { RedisBootstrap } from "@bootstrap/redis.bootstrap";

export class CacheService {
    static invalidate(prefix = ""): void {
        RedisBootstrap.clear(prefix)
    }    
}