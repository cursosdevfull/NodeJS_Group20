import type { UserApplication } from "@user/application";
import { User, UserPropsUpdate } from "@user/domain";
import { NextFunction, Request, Response } from "express";

export class UserController {
    constructor(private readonly application: UserApplication) { }

    async insert(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, password, age, sex } = request.body;

            const user = new User({ name, email, password, age, sex });
            const userCreated = await this.application.create(user);

            response.status(201).json(userCreated.properties);
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { userId } = request.params;
            const { name, password, age, sex } = request.body;

            const props: UserPropsUpdate = { name, password, age, sex };
            const userUpdated = await this.application.update(+userId, props); 
            
            response.status(201).json(userUpdated.properties);
        } catch (error) {
            next(error)
        }
   }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { userId } = request.params;
            const userDeleted = await this.application.delete(+userId);
            response.status(201).json(userDeleted.properties);
        } catch (error) {
            next(error)
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const { userId } = request.params;   
            console.log("userId", userId)
            const user = await this.application.findById(+userId);
            response.status(200).json(user.properties);
        } catch (error) {
            next(error)
        }
    }

    async getAll(_request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.application.getAll()
            response.status(200).json(users.map(user => user.properties));              
        } catch (error) {
            next(error)
        }
    }

    async getByPage(request: Request, response: Response, next: NextFunction) {
        try {
            const { page, limit } = request.query;
            const responsePage = await this.application.getByPage(
                Number(page),
                Number(limit),
            );

            response.status(200).json(responsePage);
        } catch (error) {
            next(error)
        }
    }
}