import { Product } from "../application/product"

export type ProductPort = {
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product>;
    delete(productId: number): Promise<void>;
    get(productId: number): Promise<Product | null>;
    getAll(): Promise<Product[]>;
    getByPage(page: number, size: number): Promise<Product[]>;
    searchByName(name: string): Promise<Product | undefined>;
}