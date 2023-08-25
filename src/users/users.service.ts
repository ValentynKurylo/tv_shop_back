import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDTO} from "./dto/userDTO";
import { RoleDTO } from './dto/roleDTO';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async CreateUser(dto: CreateUserDTO){
        const user = await this.userRepository.create(dto)
        return user
    }

    async GetAllUsers(){
        const users = await this.userRepository.findAll()
        return users
    }

    async getUser(id: number){
        const user = await this.userRepository.findByPk(id)
        return user
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email: email}})
        return user
    }

    async patchUserRole(role: RoleDTO, id: number){
        const user = await this.userRepository.update(role, {where:{id:id}})
        return user
    }
}
