import express, { type Application } from "express";
import { DatabaseBootstrap } from "./bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { GeneralException, PathNotFoundException, requestTiming, responseJson } from "./core";
import { env } from "./env";
import { productRouter } from "./modules/product";
import { userRouter } from "./modules/user";
import { swaggerDocs } from "./swagger";

class App {
  readonly app: Application;

  constructor() {
    this.app = express();
    this.mountMiddlewares();
    this.mountHealthCheck();
    this.mountSwagger()
    this.mountRoutes();
    this.mountHandlerErrors()
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

  private mountSwagger(): void {
    swaggerDocs(this.app, env.APP_HOST, env.PORT);
  }

  private mountRoutes(): void {
    this.app.use("/v1/product", productRouter);
    this.app.use("/v1/user", userRouter);  
  }

  private mountHandlerErrors(): void {
    this.app.use(PathNotFoundException)
    this.app.use(GeneralException)
  }
}
export default new App().app;
