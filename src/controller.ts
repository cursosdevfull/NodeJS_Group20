import "reflect-metadata";

const Controller = (prefix = ""): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata("prefix", prefix, target);
  };
};

const Get = (path = ""): MethodDecorator => {
  return (target, _propertyKey: string | symbol) => {
    Reflect.defineMetadata("path", path, target.constructor);
  };
};

@Controller("/api")
export class MyController {
  @Get("/products")
  getAll() {
    return [{ name: "product1" }, { name: "product2" }];
  }
}

const prefix = Reflect.getMetadata("prefix", MyController);
console.log("prefix", prefix); // Output: /api
