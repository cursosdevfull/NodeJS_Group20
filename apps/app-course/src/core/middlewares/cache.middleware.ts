import { RedisBootstrap } from '@bootstrap/redis.bootstrap';
import { NextFunction, Request, Response } from 'express';

export class CacheMiddleware {
    static handle(prefix: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const cacheKey = CacheMiddleware.getCacheKey(prefix, req);
    
            const cacheValue = await RedisBootstrap.client.get(cacheKey);
    
            if(cacheValue) {
                console.log("Cache hit");
                res.status(200).json(JSON.parse(cacheValue));
            } else {
                console.log("Cache miss");
                res.locals.cacheKey = cacheKey;
                next();
            }
        }
    }

    private static getCacheKey(prefix: string, req: Request) {
        const { method, url, body, params, query } = req;

        let tailKey = "";

        if(body && Object.keys(body).length >0 ){
            for(const key in body) {
                tailKey += `${key}_${body[key]}_`;
            }
        }

        if (params && Object.keys(params).length > 0) {
            for (const key in params) {
                tailKey += `${key}_${params[key]}_`;
            }
        }

        if (query && Object.keys(query).length > 0) {
            for (const key in params) {
                tailKey += `${key}_${params[key]}_`;
            }
        }

        return `${prefix}_${method}_${url.replace(/\\/,"")}_${tailKey}`;
    }
}