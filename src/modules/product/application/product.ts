export class Product {
    productId: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date | undefined;
    deletedAt: Date | undefined;

    constructor(name: string, price: number, description: string, stock: number) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.stock = stock;
        this.createdAt = new Date();

        this.productId = Math.floor(Math.random() * 10000 + 1);
    }
}