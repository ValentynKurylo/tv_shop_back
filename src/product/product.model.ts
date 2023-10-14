import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {ImageModel} from "../images/images.model";


interface ProductCreate{
    type: string,
    name: string,
    model: string,
    price: number,
    year: number,
    description: string,
    image: string,
    isAvailable: boolean,
    status: string
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreate> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:"tv"})
    @Column({type: DataType.STRING})
    type: string

    @ApiProperty({example: "LG"})
    @Column({type: DataType.STRING})
    name: string

    @ApiProperty({example: "A123"})
    @Column({type: DataType.STRING})
    model: string

    @ApiProperty({example: 7000})
    @Column({type: DataType.FLOAT})
    price: number

    @ApiProperty({example: 2019})
    @Column({type: DataType.INTEGER})
    year: number

    @ApiProperty({example: "It is good"})
    @Column({type: DataType.STRING})
    description: string

    @ApiProperty({example: "C/image.png"})
    @Column({type: DataType.STRING})
    image: string


    @ApiProperty({example: true})
    @Column({type: DataType.BOOLEAN})
    isAvailable: boolean

    @ApiProperty({example: "on sale"})
    @Column({type: DataType.STRING})
    status: string

    @HasMany(()=> ImageModel)
    images: ImageModel[]
}
