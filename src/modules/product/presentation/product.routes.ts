import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductApplication } from "../application/product.application";
import { ProductAdapter } from "../adapters/product.adapter";
import { ProductPort } from "../ports/product.port";

export class ProductRoutes {
    router: Router = Router()

    constructor(private readonly controller: ProductController) {
        this.init()
    }

    init() {
        this.router.post("/", this.controller.create.bind(this.controller))
        this.router.put("/update/:productId", this.controller.update.bind(this.controller))
        this.router.delete("/delete/:productId", this.controller.delete.bind(this.controller))
    }
}

const port: ProductPort = new ProductAdapter()
const application = new ProductApplication(port)
const controller = new ProductController(application)
export default new ProductRoutes(controller).router