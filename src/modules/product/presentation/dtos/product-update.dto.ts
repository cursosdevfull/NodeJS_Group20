import { IsNumber, IsOptional, IsString, Length, Min, type ValidationArguments } from "class-validator"

export class ProductUpdateDto {
    @IsOptional()
    @Length(8, 100, {
        message: (validation: ValidationArguments) => {
            return `${validation.property} must be at least ${validation.constraints[0]} characters long. Current value: '${validation.value}'`
        }
    })
    @IsString()
    name?: string

    @IsOptional()
    @IsNumber({}, { message: "Price must be a number" })
    @Min(0.01, { message: "Price must be greater than 0" })
    price?: number

    @IsOptional()
    @Length(10, 1000, {
        message: (validation: ValidationArguments) => {
            return `${validation.property} must be at least ${validation.constraints[0]} characters long. Current value: '${validation.value}'`
        }
    })
    @IsString()
    description?: string

    @IsOptional()
    @IsNumber({}, { message: "Stock must be a number" })
    @Min(1, { message: "Stock must be at least 1" })
    stock?: number
}