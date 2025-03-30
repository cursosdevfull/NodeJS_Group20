import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Min, type ValidationArguments } from "class-validator"

enum Sex {
    Male = "MALE",
    Female = "FEMALE"
}

export class UserCreateDto {
    @IsNotEmpty({ message: "Name is required" })
    @Length(3, 50)
    @IsString()
    name!: string

    @IsNotEmpty({ message: "Lastname is required" })
    @Length(3, 50, {
        message: (validation: ValidationArguments) => {
            return `${validation.property} must be at least ${validation.constraints[0]} characters long. Current value: '${validation.value}'`
        }
    })
    @IsString()
    lastname!: string

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
}