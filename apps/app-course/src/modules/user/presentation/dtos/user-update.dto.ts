import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsEnum, IsOptional, IsString, Length, Min, ValidateNested } from "class-validator"
import { Role } from "./role.dto"

enum Sex {
    Male = "MALE",
    Female = "FEMALE"
}

export class UserUpdateDto {
    @IsOptional()
    @Length(3, 50)
    @IsString()
    name!: string

    @IsOptional()
    @Length(3, 100)
    @IsString()
    password!: string

    @Min(18)
    @IsOptional()
    age?: number

    @Length(1, 10)
    @IsOptional()
    @IsEnum(Sex, { message: "Sex can be only MALE or FEMALE" })
    sex?: string

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1, { message: "At least one role is required" })
    @ValidateNested({ each: true })
    @Type(() => Role)
    roles!: Role[]
}