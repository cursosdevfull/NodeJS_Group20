import { Router } from "express";
import { validation, PageDto } from "@core";
import { ProductAdapter } from "@product/adapters";
import { ProductApplication } from "@product/application";
import type { ProductPort } from "@product/ports";
import { ProductController } from "@product/presentation";
import { ProductCreateDto, ProductIdDto, ProductUpdateDto } from "@product/presentation/dtos";

export class ProductRoutes {
  router: Router = Router();

  constructor(private readonly controller: ProductController) {
    this.init();
  }

  init() {
    this.router.post(
      "/",
      validation({ body: ProductCreateDto }),
      this.controller.create.bind(this.controller)
    );
    this.router.put(
      "/:productId",
      validation({ body: ProductUpdateDto, params: ProductIdDto }),
      this.controller.update.bind(this.controller),
    );
    this.router.delete(
      "/:productId",
      validation({ params: ProductIdDto }),
      this.controller.delete.bind(this.controller),
    );
    this.router.get(
      "/page",
      validation({ query: PageDto }),
      this.controller.findByPage.bind(this.controller)
    );
    this.router.get(
      "/:productId",
      validation({ params: ProductIdDto }),
      this.controller.findOne.bind(this.controller),
    );
    this.router.get("/", this.controller.findAll.bind(this.controller));
  }
}

const port: ProductPort = new ProductAdapter();
const application = new ProductApplication(port);
const controller = new ProductController(application);
export const productRouter = new ProductRoutes(controller).router;
