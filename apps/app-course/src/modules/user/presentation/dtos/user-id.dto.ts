import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class UserIdDto {
    @IsNotEmpty({ message: "userId is required" })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    userId!: number
}