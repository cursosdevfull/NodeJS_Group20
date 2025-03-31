import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, Min } from "class-validator"

export class ProductIdDto {
    @IsNotEmpty({ message: "productId is required" })
    @Type(() => Number)
    @IsInt({ message: "productId must be an integer" })
    @Min(1, { message: "productId must be greater than or equal to 1" })
    productId!: number
}