import { Auth } from "@auth/domain/auth";
import { AuthTokens } from "@auth/domain/auth-tokens";
import { AuthRepository } from "@auth/domain/auth.repository";
import { DatabaseBootstrap } from "@bootstrap/database.bootstrap";
import { compare, generateAccessToken } from "@core/services";
import { UserEntity } from "@user/infrastructure";

export class AuthInfrastructure implements AuthRepository {
    async login(auth: Auth): Promise<AuthTokens | null> {
        const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);

        const {email, password} = auth.properties()

        const user = await repository.findOne({where: { email }});
        if (!user) return null

        const passwordMatch = await compare(password, user.password)
        if(!passwordMatch) return null

        const accessToken = generateAccessToken(user.email, user.roles.map(role => role.name))
        const refreshToken = user.refreshToken

        return { accessToken, refreshToken }
    }

}