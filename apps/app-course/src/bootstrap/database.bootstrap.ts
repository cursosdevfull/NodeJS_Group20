import path from "node:path"
import { DataSource } from "typeorm";
import { env } from "../env";

export class DatabaseBootstrap {
    static datasource: DataSource;

    async initialize() {
        const datasource = new DataSource({
            type: "mysql",
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USER,
            password: env.DB_PASS,
            database: env.DB_NAME,
            synchronize: env.DB_SYNC,
            entities: [path.join(__dirname, "../modules/**/infrastructure/entities/*.entity.{ts,js}")],
            logging: env.DB_LOGG,
            poolSize: env.DB_POOL,
        });

        DatabaseBootstrap.datasource = datasource;

        await datasource.initialize();

        return "Database connection initialized";
    }

    static async healthCheck() {
        return new Promise((resolve, reject) => {
            try {
                if (
                    !DatabaseBootstrap.datasource ||
                    !DatabaseBootstrap.datasource.isInitialized
                ) {
                    reject({
                        status: "down",
                        message: "Database connection not initialized",
                    });
                    return;
                }

                DatabaseBootstrap.datasource.query("SELECT 1");
                resolve({
                    status: "up",
                    message: "Database connection is healthy",
                });
            } catch (error) {
                reject({
                    status: "down",
                    message: `Database health check failed: ${(error as Error).message}`,
                    error: (error as Error).stack,
                });
            }
        });
    }
}