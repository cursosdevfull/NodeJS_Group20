import { authRouter } from "@auth/presentation";
import { GeneralException, PathNotFoundException } from "@core/errors";
import { RequestTimingMiddleware } from "@core/middlewares";
import { CacheService } from "@core/services";
import { userRouter } from "@user/presentation";
import express, { type Application } from "express";
/* import { DatabaseBootstrap } from "./bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap"; */
//import { env } from "./env";

/* import { swaggerDocs } from "./swagger"; */

class App {
    readonly app: Application;

    constructor() {
        this.app = express();
        this.mountMiddlewares();
        this.mountHealthCheck();
        this.mountInvalidateCache();
        this.mountSwagger()
        this.mountRoutes();
        this.mountHandlerErrors()

    }

    private mountMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(RequestTimingMiddleware.handle)
    }

    private mountHealthCheck(): void {
        this.app.get("/healthcheck", (_request, response) => {
            response.status(200).json({
                status: "ok",
                uptime: process.uptime(),
                message: "API is running",
                timestamp: new Date().toISOString(),
            });
        });
    }

    private mountSwagger(): void {
        //swaggerDocs(this.app, env.APP_HOST, env.PORT);
    }

    private mountRoutes(): void {
        this.app.use("/v1/user", userRouter)
        this.app.use("/v1/auth", authRouter)
    }

    private mountHandlerErrors(): void {
        this.app.use(PathNotFoundException)
        this.app.use(GeneralException)
    }

    private mountInvalidateCache(): void {
        this.app.get("/invalidate-cache", async (request, response) => {
            const { prefix } = request.query as { prefix: string };
            CacheService.invalidate(prefix);
            response.status(200).send("Cache invalidated");
        })
    }
}
export default new App().app;