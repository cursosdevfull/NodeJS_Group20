import { Router } from "express";
import { ProductAdapter } from "../adapters";
import { ProductApplication } from "../application";
import type { ProductPort } from "../ports";
import { ProductController } from "./";

export class ProductRoutes {
  router: Router = Router();

  constructor(private readonly controller: ProductController) {
    this.init();
  }

  init() {
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.put(
      "/:productId",
      this.controller.update.bind(this.controller),
    );
    this.router.delete(
      "/:productId",
      this.controller.delete.bind(this.controller),
    );
    this.router.get("/page", this.controller.findByPage.bind(this.controller));
    this.router.get(
      "/:productId",
      this.controller.findOne.bind(this.controller),
    );
    this.router.get("/", this.controller.findAll.bind(this.controller));
  }
}

const port: ProductPort = new ProductAdapter();
const application = new ProductApplication(port);
const controller = new ProductController(application);
export const productRouter = new ProductRoutes(controller).router;
