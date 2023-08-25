import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDTO{
    @ApiProperty({example: "TV"})
    readonly type: string
    @ApiProperty({example: "LG"})
    readonly name: string
    @ApiProperty({example: "A345"})
    readonly model: string
    @ApiProperty({example: 7000})
    readonly price: number
    @ApiProperty({example: 2019})
    readonly year: number
    @ApiProperty({example: "It is good"})
    readonly description: string
    @ApiProperty({example: "C/image.png"})
    readonly image: string
    @ApiProperty({example: true})
    readonly isAvailable: boolean
    @ApiProperty({example: "On sale"})
    readonly status: string
}