import { validation } from '@core';
import { PageDto } from '@core';
import { UserApplication } from "@user/application";
import type { UserRepository } from "@user/domain";
import { UserInfrastructure } from "@user/infrastructure";
import { UserCreateDto, UserIdDto, UserUpdateDto } from "@user/presentation";
import { UserController } from "@user/presentation";
import { Router } from "express";

export class UserRoutes {
  router: Router = Router();

  constructor(private readonly controller: UserController) {
    this.init();
  }

  init() {
    this.router.post("/", validation({ body: UserCreateDto }), this.controller.insert.bind(this.controller));
    this.router.put("/:userId", validation({ body: UserUpdateDto, params: UserIdDto }), this.controller.update.bind(this.controller));
    this.router.delete(
      "/:userId",
      validation({ params: UserIdDto }),
      this.controller.delete.bind(this.controller),
    );
    this.router.get("/page", validation({ query: PageDto }), this.controller.getByPage.bind(this.controller));
    this.router.get("/:userId", validation({ params: UserIdDto }), this.controller.getById.bind(this.controller));
    this.router.get("/", this.controller.getAll.bind(this.controller));
  }
}

const port: UserRepository = new UserInfrastructure();
const application = new UserApplication(port);
const controller = new UserController(application);
export const userRouter = new UserRoutes(controller).router;
