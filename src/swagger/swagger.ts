import type { Application, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { env } from '../env';
import path from 'node:path'

const PORT = env.PORT

const options = {
    explorer: true,
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Course NodeJS",
            version: "1.0.0",
            description: "API Course NodeJS Description",
        }
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: "Local server",
        }
    ],
    apis: [path.join(__dirname, "./docs/*.doc.ts")], // Path to the API docs
}

const swaggerSpec = swaggerJsDoc(options)

export const swaggerDocs = (app: Application, hostname: string, port: number) => {
    app.get("/swagger-json", (_req: Request, res: Response) => {
        res.json(swaggerSpec)
    })

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    console.log(`Swagger is running on http://${hostname}:${port}/api-docs`)
    console.log(`Swagger JSON is running on http://${hostname}:${port}/swagger-json`)
}