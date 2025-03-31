import type { Request, Response } from "express";
import { Product, type ProductApplication } from "@product/application";

export class ProductController {
  constructor(private readonly application: ProductApplication) { }

  async create(request: Request, response: Response) {
    const { name, price, description, stock } = request.body;
    const product = new Product({ name, price, description, stock });

    const productReturned = await this.application.create(product);

    if (!productReturned) {
      response.status(411).json({ message: "Product already exists" });
    } else {
      response.status(201).json(productReturned);
    }
  }

  async update(request: Request, response: Response) {
    const { productId } = request.params;
    const { name, price, description, stock } = request.body;

    const productReturned = await this.application.update(
      Number.parseInt(productId),
      { name, price, description, stock },
    );

    if (!productReturned) {
      response.status(411).json({ message: "Product not found" });
    } else {
      response.status(201).json(productReturned);
    }
  }

  async delete(request: Request, response: Response) {
    const { productId } = request.params;

    const productReturned = await this.application.delete(
      Number.parseInt(productId),
    );

    if (!productReturned) {
      response.status(411).json({ message: "Product not found" });
    } else {
      response.status(201).json(productReturned);
    }
  }

  async findOne(request: Request, response: Response) {
    const { productId } = request.params;

    const productReturned = await this.application.getOne(
      Number.parseInt(productId),
    );

    if (!productReturned) {
      response.status(411).json({ message: "Product not found" });
    } else {
      response.status(201).json(productReturned);
    }
  }

  async findAll(_request: Request, response: Response) {
    const products = await this.application.getAll();

    response.status(200).json(products);
  }

  async findByPage(request: Request, response: Response) {
    const { page, limit } = request.query;

    const products = await this.application.getByPage(
      Number.parseInt(page as string),
      Number.parseInt(limit as string),
    );
    response.status(200).json({ ...products, page, limit });
  }
}
