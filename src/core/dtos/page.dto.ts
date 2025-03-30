import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class PageDto {
    @Type(() => Number)
    @IsNotEmpty({ message: "page is required" })
    @IsNumber({}, { message: "page must be a number" })
    @Min(1, { message: "page must be greater than or equal to 1" })
    page!: number;

    @Type(() => Number)
    @IsNotEmpty({ message: "limit is required" })
    @IsNumber({}, { message: "limit must be a number" })
    @Min(1, { message: "limit must be greater than or equal to 1" })
    limit!: number;

}