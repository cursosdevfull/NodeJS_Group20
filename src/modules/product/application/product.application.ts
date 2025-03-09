import { ProductPort } from "../ports/product.port";
import { Product } from "./product";

export class ProductApplication {
    constructor(private readonly port: ProductPort) { }

    async create(product: Product): Promise<Product | null> {
        const productExists = await this.port.searchByName(product.name);
        if (productExists) {
            return null;
        }

        return this.port.create(product);
    }


}