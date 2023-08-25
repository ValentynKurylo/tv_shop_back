import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./product.model";
import {CreateProductDTO} from "./dto/createProductDTO";
import {FilesService} from "../files/files.service";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productRepository:  typeof Product, private fileService: FilesService) {
    }

    async createProduct(productDto: CreateProductDTO, image1){
        const file = await this.fileService.CreateFile(image1)
        const product = await this.productRepository.create({...productDto, image: file})
        return product
    }

    async getProducts(){
        const products = await this.productRepository.findAll()
        return products
    }

    async getProductById(id: number){
        const product = await this.productRepository.findByPk(id)
        return product
    }

    async getProductByType(type: string){
        const products = await this.productRepository.findAll({where:{type: type}})
        return products
    }

    async getProductByName(name: string){
        const products = await this.productRepository.findAll({where: {name: name}})
        return products
    }

    async getAvailableProduct(bool: boolean){
        const products = await this.productRepository.findAll({where:{isAvailable: bool}})
        return products
    }

    async getProductByStatus(status: string){
        const products = await this.productRepository.findAll({where: {status: status}})
        return products
    }

    async putProduct(id: number, body: CreateProductDTO){
        const product = await this.productRepository.update(body, {where: {id:id}})
        return product
    }

    async deleteProduct(id: number){
        const product = await this.productRepository.destroy({where:{id:id}})
        console.log(product)
        return product
    }

    async getTypes(){
        let data =  await this.productRepository.findAll({
            attributes: ['type'],
            group: ['type'],
            order: ['type'],
        })
        return data.map((item) => item['type']);

    }

    async getAllByQuery(queryParams: any){


        return await this.productRepository.findAll({ where: queryParams });
    }


}
