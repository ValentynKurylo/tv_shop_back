import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./product.model";
import {CreateProductDTO} from "./dto/createProductDTO";
import {FilesService} from "../files/files.service";
import {isFQDN} from "class-validator";
import {bindCallback} from "rxjs";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productRepository:  typeof Product, private fileService: FilesService) {
    }

    async createProduct(productDto: CreateProductDTO, image1){
        const file = await this.fileService.CreateFile(image1)
        const product = await this.productRepository.create({...productDto, image: file})
        return product
    }

    async getProducts(query: any | {}, sort: [string, string][] = [['createdAt', 'DESC']]){
        let products = []
        if(query){
            products = await this.productRepository.findAll({
                where: query,
                order: sort

            })
        }else {
            products = await this.productRepository.findAll()
        }
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
        try {
            const product = await this.productRepository.update(body, {where: {id: id}})
            return product
        } catch (e) {
            console.log(e)
        }
    }

    async patchImage(image: any, id: number){
        let file = await this.fileService.CreateFile(image)
        let res = await this.productRepository.update({image: file}, {where: {id:id}})
        return res
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

    async getModels(type: object = null){
        let models =[]
        if(type) {
            models = await this.productRepository.findAll({
                where: {type},
                attributes: ['name'],
                group: ['name'],
                order: ['name'],
            })
        }else{
            models = await this.productRepository.findAll({
                attributes: ['name'],
                group: ['name'],
                order: ['name'],
            })
        }
        return models.map((item) => item['name']);
    }

    async getAllByQuery(queryParams: any){


        return await this.productRepository.findAll({ where: queryParams });
    }

}
