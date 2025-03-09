import http from "http"
import app from "../app"
import { Application } from "express"
import { AddressInfo } from "net"

const PORT = 3000

export class ServerBootstrap {
    private readonly app: Application

    constructor(app: Application) {
        this.app = app
    }

    initialize(): Promise<string> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(app)

            server.listen(PORT, "0.0.0.0")
                .on("error", (error) => reject(`Error: ${error}`))
                .on("listening", () => {
                    const address = server.address() as AddressInfo
                    resolve(`Server running on port ${address.port}, host ${address.address} with PID process ${process.pid}`)
                })
        })
    }


    /*
    initialize(): Promise<string> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(async (request, response) => {
                //throw new Error("Error no capturado");
                const promise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject("¡Error en promesa no capturada!")
                    }, 1000)
                })

                await promise
            })

            server.listen(PORT)
                .on("error", (error) => reject(`Error: ${error}`))
                .on("listening", () => { resolve(`Server running on port ${PORT}`); console.log(`Server running on port ${PORT}`); console.log(`Pid process ${process.pid}`) })
        })
    }

    */
}


