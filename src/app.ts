import express, { type Application } from "express";
import { DatabaseBootstrap } from "./bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { requestTiming, responseJson } from "./core";
import { productRouter } from "./modules/product";
import { userRouter } from "./modules/user";

class App {
  readonly app: Application;

  constructor() {
    this.app = express();
    this.mountMiddlewares();
    this.mountHealthCheck();
    this.mountRoutes();
  }

  private mountMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(requestTiming);
    this.app.use(responseJson);
  }

  private mountHealthCheck(): void {
    this.app.get("/healthcheck", (_request, response) => {
      Promise.all([
        ServerBootstrap.healthCheck(),
        DatabaseBootstrap.healthCheck(),
      ])
        .then((result) => {
          response.json(result);
        })
        .catch((error) => {
          response.status(500).send(error);
        });
    });
  }

  private mountRoutes(): void {
    this.app.use("/product", productRouter);
    this.app.use("/user", userRouter);
  }
}
export default new App().app;
