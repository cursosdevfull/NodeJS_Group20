import http from "http"
import app from "../app"
import { Application } from "express"
import { AddressInfo } from "net"
import { env } from '../env';

export class ServerBootstrap {
    private readonly app: Application

    constructor(app: Application) {
        this.app = app
    }

    initialize(): Promise<string> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(app)

            const PORT = env.PORT
            const APP_HOST = env.APP_HOST

            server.listen(PORT, APP_HOST)
                .on("error", (error) => reject(`Error: ${error}`))
                .on("listening", () => {
                    const address = server.address() as AddressInfo
                    resolve(`Server running on port ${address.port}, host ${address.address} with PID process ${process.pid}`)
                })
        })
    }

    static async healthCheck() {
        return {
            status: 'up',
            message: 'Server is healthy',
        }
    }
}


