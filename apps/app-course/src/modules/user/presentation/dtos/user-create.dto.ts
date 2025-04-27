import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Min, ValidateNested } from "class-validator"
import { Role } from "./role.dto"

enum Sex {
    Male = "MALE",
    Female = "FEMALE"
}

export class UserCreateDto {
    @IsNotEmpty({ message: "Name is required" })
    @Length(3, 50)
    @IsString()
    name!: string

    @IsNotEmpty({ message: "Email is required" })
    @Length(3, 100)
    @IsString()
    @IsEmail()
    email!: string

    @IsNotEmpty({ message: "Password is required" })
    @Length(3, 100)
    @IsString()
    password!: string

    @IsNotEmpty()
    @Min(18)
    @IsOptional()
    age?: number

    @IsNotEmpty()
    @Length(1, 10)
    @IsOptional()
    @IsEnum(Sex, { message: "Sex can be only MALE or FEMALE" })
    sex?: string

    @IsNotEmpty()
    @IsArray() 
    @ArrayMinSize(1, { message: "At least one role is required" })
    @ValidateNested({ each: true })
    @Type(() => Role)
    roles!: Role[]
}