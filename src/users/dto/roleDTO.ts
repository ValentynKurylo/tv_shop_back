import {ApiProperty} from "@nestjs/swagger";
import {RoleEnum} from "../../guards/role.enum";
import {IsString} from "class-validator";

export class RoleDTO{
    @ApiProperty({example: RoleEnum.USER})
    @IsString({message: "Role must be string"})
    readonly role: RoleEnum
}