import type { UserApplication } from "@user/application";
import { User } from "@user/domain";
import type { NextFunction, Request, Response } from "express";

export class UserController {
  constructor(private readonly application: UserApplication) { }

  async insert(request: Request, response: Response, next: NextFunction) {
    const { name, lastname, email, password, age, sex } = request.body;

    const user = new User({ name, lastname, email, password, age, sex });
    const userResult = await this.application.create(user);

    if (!(userResult instanceof User)) {
      //response.status(userResult.status).json({ message: userResult.message, stack: userResult.stack });
      next(userResult);
    } else {
      response.status(201).json(userResult.properties);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const { name, lastname, email, password, age, sex } = request.body;

    const props = { name, lastname, email, password, age, sex };
    const userResult = await this.application.update(userId, props);

    if (!(userResult instanceof User)) {
      //response.status(userResult.status).json({ message: userResult.message, stack: userResult.stack });
      next(userResult);
    } else {
      response.status(201).json(userResult.properties);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const userResult = await this.application.delete(userId);

    if (!(userResult instanceof User)) {
      //response.status(userResult.status).json({ message: userResult.message, stack: userResult.stack });
      next(userResult);
    } else {
      response.status(204).send();
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    const userResult = await this.application.getById(userId);

    if (!(userResult instanceof User)) {
      //response.status(userResult.status).json({ message: userResult.message, stack: userResult.stack });
      next(userResult);
    } else {
      response.status(200).json(userResult.properties);
    }
  }

  async getAll(_request: Request, response: Response, next: NextFunction) {
    const usersResult = await this.application.getAll();

    if (!(Array.isArray(usersResult))) {
      //response.status(usersResult.status).json({ message: usersResult.message, stack: usersResult.stack });
      next(usersResult);
    } else {
      response.status(200).json(usersResult.map((item) => item.properties));
    }
  }

  async getByPage(request: Request, response: Response, next: NextFunction) {
    const { page, limit } = request.query;

    const responsePageUsersResult = await this.application.getByPage(
      Number(page),
      Number(limit),
    );

    if (!responsePageUsersResult || 'status' in responsePageUsersResult) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const error = responsePageUsersResult as any;
      //response.status(error.status).json({ message: error.message, stack: error.stack });
      next(error);
    } else {
      response.status(200).json(responsePageUsersResult);
    }
  }
}