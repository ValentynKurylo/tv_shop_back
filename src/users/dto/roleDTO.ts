import {ApiProperty} from "@nestjs/swagger";

export class RoleDTO{
    @ApiProperty({example: "user"})
    readonly role: string
}