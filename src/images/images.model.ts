import {Column, DataType, Model, Table, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {Product} from "../product/product.model";


interface ImageCreate{
    image: string
}

@Table({ tableName: 'images' })
export class ImageModel extends Model<ImageModel, ImageCreate> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "C/img.ong"})
    @Column({type: DataType.STRING})
    image: string

    @ForeignKey(()=>Product)
    @Column({type: DataType.INTEGER})
    productId: number

    @BelongsTo(()=>Product, {onDelete: 'CASCADE'})
    product: Product
}