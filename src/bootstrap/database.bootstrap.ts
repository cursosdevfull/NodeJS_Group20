import { DataSource } from "typeorm";

export class DatabaseBootstrap {
    static datasource: DataSource

    async initialize() {
        const datasource = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "user",
            password: "12345",
            database: "db",
            synchronize: true,
            entities: ["src/modules/**/*.entity.ts"],
            logging: true,
            poolSize: 10
        })

        DatabaseBootstrap.datasource = datasource

        await datasource.initialize()

        return `Database connection initialized`
    }

    static async healthCheck() {
        return new Promise(async (resolve, reject) => {
            try {
                if (!DatabaseBootstrap.datasource || !DatabaseBootstrap.datasource.isInitialized) {
                    reject({
                        status: 'down',
                        message: 'Database connection not initialized'
                    })
                    return
                }

                await DatabaseBootstrap.datasource.query('SELECT 1');
                resolve({
                    status: 'up',
                    message: 'Database connection is healthy',
                })
            } catch (error) {
                reject({
                    status: 'down',
                    message: `Database health check failed: ${(error as Error).message}`,
                    error: (error as Error).stack
                })
            }
        })

    }
}
