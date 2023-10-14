import {Controller, Post, Body, Get, Param, UseGuards, Patch, UsePipes} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDTO} from "./dto/userDTO";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {authGuards} from "../guards/authGuards";
import {Role} from "../guards/roleAuthDecorator";
import {RoleDTO} from "./dto/roleDTO";
import {ValidatorPipes} from "../pipes/validatoePipes";
import {roleGuards} from "../guards/roleGuard";



@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary:'Create user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidatorPipes)
    @Post()
    postUser(@Body() userDTO: CreateUserDTO){
       return this.usersService.CreateUser(userDTO)
    }

    @ApiOperation({summary:'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getUsers(){
        return this.usersService.GetAllUsers()
    }

    @ApiOperation({summary:'Get one user'})
    @ApiResponse({status: 200, type: User})
    @Get('/:id')
    @UseGuards(authGuards)
    getUser(@Param('id')id: number){
        return this.usersService.getUser(id)
    }

    @ApiOperation({summary:'Patch user role'})
    @ApiResponse({status: 200, type: String})
    @Role('admin')
    @UseGuards(roleGuards)
    @Patch('/:id')
    updateUserRole(@Body() role: RoleDTO, @Param('id')id: number){
        this.usersService.patchUserRole(role, id)
        return "user was updated"
    }
}
