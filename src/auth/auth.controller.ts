import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDTO} from "../users/dto/userDTO";
import {AuthService} from "./auth.service";
import {User} from "../users/user.model";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary:'Login'})
    @ApiResponse({status: 200, type: String})
    @Post('/login')
    login(@Body() userDTO: CreateUserDTO){
        return this.authService.login(userDTO)
    }

    @ApiOperation({summary:'Registration'})
    @ApiResponse({status: 200, type: String})
    @Post('/registration')
    registration(@Body() userDTO: CreateUserDTO){
        return this.authService.registration(userDTO)
    }
}
