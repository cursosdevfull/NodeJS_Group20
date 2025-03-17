import express, { Application } from "express"
import { DatabaseBootstrap, KafkaBootstrap, RedisBootstrap } from "./bootstrap"
import { requestTiming, responseJSON } from "./core"
import { productRouter } from "./modules/product"

class App {
    readonly app: Application

    constructor() {
        this.app = express()
        this.mountMiddlewares()
        this.mountHealthCheck()
        this.mountRoutes()
    }

    private mountMiddlewares(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(requestTiming)
        this.app.use(responseJSON)
    }

    private mountHealthCheck(): void {
        this.app.get("/healthcheck", (request, response) => {
            console.log("healthcheck executed")

            Promise.all([DatabaseBootstrap.healthCheck()])
                .then((result) => {
                    response.send(result)
                })
                .catch((error) => {
                    response.status(500).send(error)
                })
        })
    }

    private mountRoutes(): void {
        this.app.use("/product", productRouter)
    }
}
export default new App().app