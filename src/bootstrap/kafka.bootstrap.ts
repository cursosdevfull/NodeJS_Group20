export class KafkaBootstrap {
    private static instance: KafkaBootstrap

    private constructor() { }

    static getInstance(): KafkaBootstrap {
        if (!this.instance) {
            this.instance = new KafkaBootstrap()
        }
        return this.instance
    }

    initialize(): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Kafka initialized")
            }, 2000);
        })
    }

    healthCheck(): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //resolve("Kafka is healthy")
                reject("Kafka is not healthy")
            }, 2000);
        })
    }
}


