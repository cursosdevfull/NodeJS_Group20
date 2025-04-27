// biome-ignore lint/style/useNamingConvention: <explanation>
import IORedis from "ioredis";
import { env } from '../env';

export class RedisBootstrap {
    static client: IORedis

    async initialize() {
       return new Promise((resolve, reject) => {
        const client = new IORedis({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            password: env.REDIS_PASS,
        })

        client
         .on("connect", () => {
            console.log("Redis connection established")
            resolve(true)
         })
         .on("error", error => {
            console.error("Redis connection error", error)
            reject(error)
         })

        RedisBootstrap.client = client
       })
    }


    static async get(key: string) {
        return RedisBootstrap.client.get(key)
    }

    static async set(key: string, value: string) {
        return RedisBootstrap.client.set(key, value, "PX", 1000 * 60 * env.REDIS_TTL)
    }

    static async clear(prefix: string) {
        const keys = await RedisBootstrap.client.keys(`${prefix}*`)
        const pipeline = RedisBootstrap.client.pipeline()

        keys.forEach( key => pipeline.del(key))

        await pipeline.exec()
    }
}