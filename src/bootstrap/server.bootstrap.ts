import http from "node:http";
import type { AddressInfo } from "node:net";
import type { Application } from "express";
import app from "../app";
import { env } from "../env";

export class ServerBootstrap {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  initialize(): Promise<string> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(app);

      const port = env.PORT;
      const appHost = env.APP_HOST;

      server
        .listen(port, appHost)
        .on("error", (error) => reject(`Error: ${error}`))
        .on("listening", () => {
          const address = server.address() as AddressInfo;
          resolve(
            `Server running on port ${address.port}, host ${address.address} with PID process ${process.pid}`,
          );
        });
    });
  }

  static async healthCheck() {
    return {
      status: "up",
      message: "Server is healthy",
    };
  }
}
