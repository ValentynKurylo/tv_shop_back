import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {RoleEnum} from "../guards/role.enum";

interface UserCreate{
  username: string,
  email: string,
  password: string,
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreate> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:"user@gmail.com"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: "1111"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: "User User"})
    @Column({type: DataType.STRING, defaultValue: 'Null'})
    username: string

    @ApiProperty({example: RoleEnum.USER})
    @Column({type: DataType.STRING, defaultValue: String(RoleEnum.USER)})
    role: RoleEnum
}
