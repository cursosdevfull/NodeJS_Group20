import express, { Application } from "express"
import { DatabaseBootstrap, KafkaBootstrap, RedisBootstrap } from "./bootstrap"
import { requestTiming } from "./core"
import { responseJSON } from "./core/middlewares/response-json.middleware"

class App {
    readonly app: Application

    constructor() {
        this.app = express()
        this.mountMiddlewares()
        this.mountHealthCheck()
        this.mountRoutes()
    }

    private mountMiddlewares(): void {
        this.app.use(requestTiming)
        this.app.use(responseJSON)
    }

    private mountHealthCheck(): void {
        this.app.get("/healthcheck", (request, response) => {
            console.log("healthcheck executed")
            const database = DatabaseBootstrap.getInstance()
            const redis = RedisBootstrap.getInstance()
            const kafka = KafkaBootstrap.getInstance()

            Promise.all([database.healthCheck(), redis.healthCheck(), kafka.healthCheck()])
                .then((result) => {
                    response.send(result)
                })
                .catch((error) => {
                    response.status(500).send(error)
                })
        })
    }

    private mountRoutes(): void {
        this.app.get("/", (request, response) => {
            console.log("path executed")
            response.send("¡Hola, mundo!")
        })
    }
}
export default new App().app