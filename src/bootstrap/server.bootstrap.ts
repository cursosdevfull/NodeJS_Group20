import http from "http"
import app from "../app"
import { Application } from "express"

const PORT = 3000

export class ServerBootstrap {
    private readonly app: Application

    constructor(app: Application) {
        this.app = app
    }

    initialize(): Promise<string> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(app)

            server.listen(PORT)
                .on("error", (error) => reject(`Error: ${error}`))
                .on("listening", () => resolve(`Server running on port ${PORT}`))
        })
    }
}


