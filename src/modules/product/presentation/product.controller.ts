import { Product } from "../application/product";
import { ProductApplication } from "../application/product.application";
import { Request, Response } from "express"

export class ProductController {
    constructor(private readonly application: ProductApplication) {
    }

    async create(request: Request, response: Response) {
        const { name, price, description, stock } = request.body;
        const product = new Product(name, price, description, stock)

        const productReturned = await this.application.create(product)

        if (!productReturned) {
            response.status(411).send("Product already exists")
        } else {
            response.status(201).json(productReturned)
            //response.status(201).type("application/json").send(JSON.stringify(product))
        }

    }
}