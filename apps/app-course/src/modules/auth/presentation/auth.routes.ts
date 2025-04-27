import { AuthApplication } from "@auth/application";
import { AuthRepository } from "@auth/domain";
import { AuthInfrastructure } from "@auth/infrastructure";
import { Router } from "express";
import { AuthController } from "./auth.controller";

class AuthRoutes {
    router = Router()

    constructor(private readonly controller: AuthController) {
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.post("/login", this.controller.login.bind(this.controller));
    }
}

const repository: AuthRepository = new AuthInfrastructure()
const application = new AuthApplication(repository)
const controller = new AuthController(application)
export const authRouter = new AuthRoutes(controller).router