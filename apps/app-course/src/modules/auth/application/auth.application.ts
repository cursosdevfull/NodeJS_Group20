import { Auth } from "@auth/domain/auth";
import { AuthRepository } from "@auth/domain/auth.repository";

export class AuthApplication  {
    constructor(private readonly repository: AuthRepository){}

    async login(email: string, password: string) {
        const auth = await this.repository.login(new Auth(email, password))
        return auth
    }
}