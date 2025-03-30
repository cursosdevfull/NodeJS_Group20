import { IsNotEmpty, IsUUID } from "class-validator";

export class UserIdDto {
    @IsNotEmpty({ message: "userId is required" })
    @IsUUID("all", { message: "userId must be a valid UUID" })
    userId!: string;
}