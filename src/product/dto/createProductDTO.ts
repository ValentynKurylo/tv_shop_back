import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsInt, IsNumber, IsString, Min} from "class-validator"

export class CreateProductDTO{
    @ApiProperty({example: "TV"})
    @IsString({message: "Type  must be string"})
    readonly type: string
    @ApiProperty({example: "LG"})
    @IsString({message: "Mark  must be string"})
    readonly name: string
    @ApiProperty({example: "A345"})
    @IsString({message: "Model  must be string"})
    readonly model: string
    @ApiProperty({example: 7000})
    @IsNumber()
    @Min(0)
    readonly price: number
    @ApiProperty({example: 2019})
    @IsInt()
    @Min(1900)
    readonly year: number
    @ApiProperty({example: "It is good"})
    @IsString({message: "Description must be string"})
    readonly description: string
    @ApiProperty({example: "C/image.png"})
    readonly image: string
    @ApiProperty({example: true})
    @IsBoolean({message: "Available must be boolean 1 or 0"})
    readonly isAvailable: boolean
    @ApiProperty({example: "On sale"})
    @IsString({message: "Status  must be string"})
    readonly status: string
}