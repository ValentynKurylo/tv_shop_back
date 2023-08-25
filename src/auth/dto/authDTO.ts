import {ApiProperty} from "@nestjs/swagger";

export class UserAuthDTO{
    @ApiProperty({example: "user@gamil.com"})
    readonly email: string;
    @ApiProperty({example: "1111"})
    readonly password: string;
}