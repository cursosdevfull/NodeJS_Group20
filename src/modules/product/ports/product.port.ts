import type { ResponsePage } from "@core";
import type { Product } from "@product/application";

export type ProductPort = {
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  get(productId: number): Promise<Product | null>;
  getAll(): Promise<Product[]>;
  getByPage(page: number, size: number): Promise<ResponsePage<Product>>;
  searchByName(name: string): Promise<Product | null>;
};
