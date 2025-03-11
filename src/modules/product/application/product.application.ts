import { ProductPort } from "../ports/product.port";
import { Product, ProductUpdate } from "./product";

export class ProductApplication {
    constructor(private readonly port: ProductPort) { }

    async create(product: Product): Promise<Product | null> {
        const productExists = await this.port.searchByName(product.properties().name);
        if (productExists) {
            return null;
        }

        return this.port.create(product);
    }

    async update(productId: number, props: ProductUpdate) {
        const product = await this.port.get(productId);
        if (!product) {
            return null;
        }

        product.update(props);

        return this.port.update(product);
    }

    async delete(productId: number) {
        const product = await this.port.get(productId);
        if (!product) {
            return null;
        }

        product.delete();

        return this.port.update(product);
    }


}