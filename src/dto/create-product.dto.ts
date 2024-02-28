import { IsNumber, IsOptional, IsString, isNumber } from "class-validator";

export class CreateProductDto {
    @IsString()
    name : string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    price: number;
}