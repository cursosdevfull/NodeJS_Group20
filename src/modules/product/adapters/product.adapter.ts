import { Product } from "../application/product";
import { ProductPort } from "../ports/product.port";

export class ProductAdapter implements ProductPort {
    private products: Product[] = [];

    async create(product: Product): Promise<Product> {
        this.products.push(product);
        return product
    }
    update(product: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(productId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get(productId: number): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    getByPage(page: number, size: number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    async searchByName(name: string): Promise<Product | undefined> {
        return this.products.find(product => product.name.toLowerCase() === name.toLowerCase())
    }
}