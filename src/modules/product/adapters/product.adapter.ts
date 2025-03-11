import { Product } from "../application/product";
import { ProductPort } from "../ports/product.port";

export class ProductAdapter implements ProductPort {
    private products: Product[] = [];

    async create(product: Product): Promise<Product> {
        this.products.push(product);
        return product
    }

    async update(product: Product): Promise<Product> {
        const productId = product.properties().productId
        const index = this.products.findIndex(product => product.properties().productId === productId)
        this.products[index] = product

        return this.products[index]
    }
    delete(productId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async get(productId: number): Promise<Product | null> {
        return this.products.find(product => product.properties().productId === productId && product && !product.properties().deletedAt) || null
    }
    getAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    getByPage(page: number, size: number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    async searchByName(name: string): Promise<Product | undefined> {
        return this.products.find(product => product.properties().name.toLowerCase() === name.toLowerCase())
    }
}