import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class Role {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    roleId!: number;

    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;
}