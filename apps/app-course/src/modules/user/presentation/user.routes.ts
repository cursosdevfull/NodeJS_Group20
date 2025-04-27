import { PageDto } from '@core/dtos';
import { RoleUser } from '@core/enums';
import { applyMiddlewares } from '@core/middlewares';
import { CacheMiddleware } from '@core/middlewares/cache.middleware';
import { UserApplication } from "@user/application";
import type { UserRepository } from "@user/domain";
import { UserInfrastructure } from "@user/infrastructure";
import { Router, } from "express";
import { UserCreateDto, UserIdDto, UserUpdateDto } from './dtos';
import { UserController } from './user.controller';

class UserRoutes {
    router: Router = Router();

    constructor(private readonly controller: UserController) {
        this.init();
    }

    init() {
        this.router.get("/", 
            applyMiddlewares({
                isAuthenticated: true,
                rolesAllowed: [RoleUser.Admin, RoleUser.Operator, RoleUser.Audit],
            }),  
            CacheMiddleware.handle("USER"),
            this.controller.getAll.bind(this.controller));

        this.router.post("/", 
            applyMiddlewares({
                isAuthenticated: true, 
                rolesAllowed: [RoleUser.Admin], 
                schemasValidation: { body: UserCreateDto }
            }),
            this.controller.insert.bind(this.controller));

        this.router.put("/:userId", 
            applyMiddlewares({
                isAuthenticated: true,
                rolesAllowed: [RoleUser.Admin],
                schemasValidation: { body: UserUpdateDto, params: UserIdDto }
            }),            
            this.controller.update.bind(this.controller));

        this.router.delete(
            "/:userId",
            applyMiddlewares({
                isAuthenticated: true,
                rolesAllowed: [RoleUser.Admin],
                schemasValidation: { params: UserIdDto }
            }),  
            this.controller.delete.bind(this.controller),
        );

        this.router.get("/page", 
            applyMiddlewares({
                isAuthenticated: true,
                rolesAllowed: [RoleUser.Admin, RoleUser.Operator, RoleUser.Audit],
                schemasValidation: { query: PageDto }
            }),              
            this.controller.getByPage.bind(this.controller));

        this.router.get("/:userId", 
            applyMiddlewares({
                isAuthenticated: true,
                rolesAllowed: [RoleUser.Admin, RoleUser.Audit],
                schemasValidation: { params: UserIdDto }
            }),              
            this.controller.getById.bind(this.controller));

    }
}

const port: UserRepository = new UserInfrastructure();
const application = new UserApplication(port);
const controller = new UserController(application);
export const userRouter = new UserRoutes(controller).router;