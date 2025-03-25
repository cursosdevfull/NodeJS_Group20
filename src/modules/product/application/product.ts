type ProductRequired = {
  name: string;
  price: number;
  description: string;
  stock: number;
};

type ProductOptional = {
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type ProductProps = ProductRequired & Partial<ProductOptional>;

export type ProductUpdate = Partial<ProductRequired>;

export class Product {
  private readonly productId: number | undefined;
  private name: string;
  private price: number;
  private description: string;
  private stock: number;
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: ProductProps) {
    if (props.name.length < 8) throw "Name must have at least 8 characters";
    if (props.description.length < 10)
      throw "Description must have at least 10 characters";
    if (props.price <= 0) throw "Price must be greater than 0";
    if (props.stock <= 0) throw "Stock must be greater than 0";

    this.name = props.name;
    this.price = props.price;
    this.description = props.description;
    this.stock = props.stock;
    this.createdAt = new Date();

    if (props.productId) this.productId = props.productId;
    this.createdAt = props.createdAt || new Date();
  }

  properties() {
    return {
      productId: this.productId,
      name: this.name,
      price: this.price,
      description: this.description,
      stock: this.stock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: ProductUpdate) {
    if (props.name && props.name.length < 8)
      throw "Name must have at least 8 characters";
    if (props.description && props.description.length < 10)
      throw "Description must have at least 10 characters";
    if (props.price && props.price <= 0) throw "Price must be greater than 0";
    if (props.stock && props.stock <= 0) throw "Stock must be greater than 0";

    this.name = props.name || this.name;
    this.price = props.price || this.price;
    this.description = props.description || this.description;
    this.stock = props.stock || this.stock;
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
