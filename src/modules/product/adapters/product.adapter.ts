import { IsNull, Like } from "typeorm";
import { DatabaseBootstrap } from "../../../bootstrap";
import type { ResponsePage } from "../../../core";
import { Product } from "../application";
import type { ProductPort } from "../ports";
import { ProductEntity } from "./entities";

export class ProductAdapter implements ProductPort {
  async create(product: Product): Promise<Product> {
    const repository =
      DatabaseBootstrap.datasource.getRepository(ProductEntity);

    const productEntity = new ProductEntity();
    productEntity.name = product.properties().name;
    productEntity.price = product.properties().price;
    productEntity.description = product.properties().description;
    productEntity.stock = product.properties().stock;
    productEntity.createdAt = product.properties().createdAt;
    productEntity.updatedAt = product.properties().updatedAt;
    productEntity.deletedAt = product.properties().deletedAt;

    const productReturned = await repository.save(productEntity);

    console.log("Product returned: ", productReturned);

    return new Product(productReturned);
  }

  async update(product: Product): Promise<Product> {
    const repository =
      DatabaseBootstrap.datasource.getRepository(ProductEntity);

    const productEntity = new ProductEntity();
    productEntity.productId = product.properties().productId;
    productEntity.name = product.properties().name;
    productEntity.price = product.properties().price;
    productEntity.description = product.properties().description;
    productEntity.stock = product.properties().stock;
    productEntity.createdAt = product.properties().createdAt;
    productEntity.updatedAt = product.properties().updatedAt;
    productEntity.deletedAt = product.properties().deletedAt;

    await repository.save(productEntity);

    return product;
  }

  async get(productId: number): Promise<Product | null> {
    const repository =
      DatabaseBootstrap.datasource.getRepository(ProductEntity);

    const productReturned = await repository.findOne({
      where: { productId, deletedAt: IsNull() },
    });

    if (!productReturned) return null;

    return new Product(productReturned);
  }

  async getAll(): Promise<Product[]> {
    const repository =
      DatabaseBootstrap.datasource.getRepository(ProductEntity);

    const productsReturned = await repository.find({
      where: { deletedAt: IsNull() },
    });
    return productsReturned.map((product) => new Product(product));
  }

  async getByPage(page: number, size: number): Promise<ResponsePage<Product>> {
    const repository =
      DatabaseBootstrap.datasource.getRepository(ProductEntity);

    const [productsReturned, total] = await repository.findAndCount({
      where: { deletedAt: IsNull() },
      skip: (page - 1) * size,
      take: size,
    });
    return {
      results: productsReturned.map((product) => new Product(product)),
      total,
    };
  }

  async searchByName(name: string): Promise<Product | null> {
    const repository =
      DatabaseBootstrap.datasource.getRepository(ProductEntity);

    const productReturned = await repository.findOne({
      where: { name: Like(`%${name}%`), deletedAt: IsNull() },
    });

    if (!productReturned) return null;

    return new Product(productReturned);
  }
}
