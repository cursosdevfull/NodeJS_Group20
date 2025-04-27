import { Auth } from "./auth"
import { AuthTokens } from "./auth-tokens"

export type AuthRepository = {
    login(auth: Auth): Promise<AuthTokens | null>
}