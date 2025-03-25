import { Router } from "express";
import { UserApplication } from "../application";
import type { UserRepository } from "../domain";
import { UserInfrastructure } from "../infrastructure";
import { UserController } from "./user.controller";

export class UserRoutes {
  router: Router = Router();

  constructor(private readonly controller: UserController) {
    this.init();
  }

  init() {
    this.router.post("/", this.controller.insert.bind(this.controller));
    this.router.put("/:userId", this.controller.update.bind(this.controller));
    this.router.delete(
      "/:userId",
      this.controller.delete.bind(this.controller),
    );
    this.router.get("/page", this.controller.getByPage.bind(this.controller));
    this.router.get("/:userId", this.controller.getById.bind(this.controller));
    this.router.get("/", this.controller.getAll.bind(this.controller));
  }
}

const port: UserRepository = new UserInfrastructure();
const application = new UserApplication(port);
const controller = new UserController(application);
export const userRouter = new UserRoutes(controller).router;
