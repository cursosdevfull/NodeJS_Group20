import "reflect-metadata";
import app from "./app";
import { DatabaseBootstrap, ServerBootstrap } from "./bootstrap";
import "./env";

const server = new ServerBootstrap(app);
const database = new DatabaseBootstrap();

(async () => {
  try {
    const response = await Promise.allSettled([
      server.initialize(),
      database.initialize(),
    ]);

    response.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log(result.value);
      } else {
        console.error(result.reason);
      }
    });
  } catch (error) {
    console.error(error);
  }
})();

process.on("uncaughtException", (error) => {
  console.error("¡Excepción no capturada!", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, _promise) => {
  console.error("¡Rechazo no capturado!", reason);
  process.exit(1);
});

process.on("exit", () => {
  console.log("¡Saliendo de la aplicación!");
  gracefullyShutdown();
});

process.on("SIGINT", () => {
  console.log("¡SIGINT recibido!");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("¡SIGTERM recibido!");
  process.exit(0);
});

function gracefullyShutdown() {
  console.log("¡Cerrando la aplicación!");
  /*     database.close()
        redis.close()
        kafka.close() */
}
