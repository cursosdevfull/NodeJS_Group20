import type { Request, Response } from "express";
import type { UserApplication } from "../application";
import { User } from "../domain";

export class UserController {
  constructor(private readonly application: UserApplication) { }

  async insert(request: Request, response: Response) {
    const { name, lastname, email, password, age, sex } = request.body;

    const user = new User({ name, lastname, email, password, age, sex });
    const userCreated = await this.application.create(user);

    response.status(201).json(userCreated.properties);
  }

  async update(request: Request, response: Response) {
    const { userId } = request.params;
    const { name, lastname, email, password, age, sex } = request.body;

    const props = { name, lastname, email, password, age, sex };
    const userUpdated = await this.application.update(userId, props);

    response.status(201).json(userUpdated.properties);
  }

  async delete(request: Request, response: Response) {
    const { userId } = request.params;

    await this.application.delete(userId);

    response.status(204).send();
  }

  async getById(request: Request, response: Response) {
    const { userId } = request.params;

    const user = await this.application.getById(userId);

    if (!user) {
      response.status(411).json({ message: "User not found" });
    } else {
      response.status(200).json(user.properties);
    }
  }

  async getAll(_request: Request, response: Response) {
    const users = await this.application.getAll();

    response.status(200).json(users.map((item) => item.properties));
  }

  async getByPage(request: Request, response: Response) {
    const { page, limit } = request.query;

    const responsePageUsers = await this.application.getByPage(
      Number(page),
      Number(limit),
    );

    response.status(200).json(responsePageUsers);
  }
}
