export class RedisBootstrap {
  private static instance: RedisBootstrap;

  private constructor() {}

  static getInstance(): RedisBootstrap {
    if (!RedisBootstrap.instance) {
      RedisBootstrap.instance = new RedisBootstrap();
    }
    return RedisBootstrap.instance;
  }

  initialize(): Promise<string> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve("Redis initialized");
      }, 2000);
    });
  }

  healthCheck(): Promise<string> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve("Redis is healthy");
      }, 2000);
    });
  }
}
