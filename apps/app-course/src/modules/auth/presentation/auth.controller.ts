import { AuthApplication } from "@auth/application";
import { Request, Response } from "express";

export class AuthController {
    constructor(private readonly application: AuthApplication) {}

    async login(request: Request, response: Response) {
        const { email, password } = request.body;
        const auth = await this.application.login(email, password);

        if (!auth) {
            response.status(401).json({ message: "Invalid credentials" });
        } else {
            response.status(200).json(auth);
        }   
    }
}