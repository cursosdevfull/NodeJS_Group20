export class RedisBootstrap {
    private static instance: RedisBootstrap

    private constructor() { }

    static getInstance(): RedisBootstrap {
        if (!this.instance) {
            this.instance = new RedisBootstrap()
        }
        return this.instance
    }

    initialize(): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Redis initialized")
            }, 2000);
        })
    }

    healthCheck(): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Redis is healthy")
            }, 2000);
        })
    }
}


