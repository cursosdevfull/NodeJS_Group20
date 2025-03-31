import { IsNotEmpty, IsNumber, IsString, Length, Min, type ValidationArguments } from "class-validator"

export class ProductCreateDto {
    @IsNotEmpty({ message: "Name is required" })
    @Length(8, 100, {
        message: (validation: ValidationArguments) => {
            return `${validation.property} must be at least ${validation.constraints[0]} characters long. Current value: '${validation.value}'`
        }
    })
    @IsString()
    name!: string

    @IsNotEmpty({ message: "Price is required" })
    @IsNumber({}, { message: "Price must be a number" })
    @Min(0.01, { message: "Price must be greater than 0" })
    price!: number

    @IsNotEmpty({ message: "Description is required" })
    @Length(10, 1000, {
        message: (validation: ValidationArguments) => {
            return `${validation.property} must be at least ${validation.constraints[0]} characters long. Current value: '${validation.value}'`
        }
    })
    @IsString()
    description!: string

    @IsNotEmpty({ message: "Stock is required" })
    @IsNumber({}, { message: "Stock must be a number" })
    @Min(1, { message: "Stock must be at least 1" })
    stock!: number
}