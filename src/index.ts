import app from './app';
import { DatabaseBootstrap, KafkaBootstrap, RedisBootstrap, ServerBootstrap } from './bootstrap';

const server = new ServerBootstrap(app);
const database = DatabaseBootstrap.getInstance();
const redis = RedisBootstrap.getInstance();
const kafka = KafkaBootstrap.getInstance();

(async () => {
    try {
        const response = await Promise.allSettled(
            [
                server.initialize(),
                database.initialize(),
                redis.initialize(),
                kafka.initialize()
            ])

        response.forEach((result) => {
            if (result.status === "fulfilled") {
                console.log(result.value)
            } else {
                console.error(result.reason)
            }
        })
    } catch (error) {
        console.error(error)
    }
})()




