import { Exclude, Expose } from "class-transformer"
import { Role } from "./role.dto"

export class UserResponseDto {
    @Expose()
    name!: string

    @Expose()
    email!: string

    @Exclude()
    password!: string

    @Expose()
    age?: number

    @Expose()
    sex?: string

    @Exclude()
    refreshToken!: string

    @Expose()
    roles!: Role[]
}