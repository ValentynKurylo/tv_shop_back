import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "../users/user.model";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDTO} from "../users/dto/userDTO";
import * as bcrypt from 'bcryptjs'
import {UserAuthDTO} from "./dto/authDTO";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async login(userDTO: CreateUserDTO){
        const user = await this.validateUser(userDTO)
        return await this.generateToken(user)
    }

    async registration(userDTO: CreateUserDTO){

        const candidate = await this.userService.getUserByEmail(userDTO.email)

        if(candidate){
            throw  new  HttpException('User with email already exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDTO.password, 4)
        const user = await this.userService.CreateUser({...userDTO, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, role: user.role, username: user.username}
        return {
            token: this.jwtService.sign(payload),
            user_1: payload
        }
    }

    private async validateUser(userDto: UserAuthDTO){
        const user = await this.userService.getUserByEmail(userDto.email)
        if (!user){
            throw new HttpException("Wrong email or password", HttpStatus.BAD_REQUEST)
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(!passwordEquals){
            throw new HttpException("Wrong email or password", HttpStatus.BAD_REQUEST)
        }
        return user
    }


}
