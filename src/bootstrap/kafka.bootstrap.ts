export class KafkaBootstrap {
  private static instance: KafkaBootstrap;

  private constructor() {}

  static getInstance(): KafkaBootstrap {
    if (!KafkaBootstrap.instance) {
      KafkaBootstrap.instance = new KafkaBootstrap();
    }
    return KafkaBootstrap.instance;
  }

  initialize(): Promise<string> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve("Kafka initialized");
      }, 2000);
    });
  }

  healthCheck(): Promise<string> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve("Kafka is healthy");
        //reject("Kafka is not healthy")
      }, 2000);
    });
  }
}
