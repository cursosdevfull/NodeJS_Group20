export class DatabaseBootstrap {
    private static instance: DatabaseBootstrap

    private constructor() { }

    static getInstance(): DatabaseBootstrap {
        if (!this.instance) {
            this.instance = new DatabaseBootstrap()
        }
        return this.instance
    }

    initialize(): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Database initialized")
            }, 2000);
        })
    }

    healthCheck(): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Database is healthy")
            }, 2000);
        })
    }
}
