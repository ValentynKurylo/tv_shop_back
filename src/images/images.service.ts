import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ImageModel} from "./images.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class ImagesService {
    constructor(@InjectModel(ImageModel) private imageRepository: typeof ImageModel, private fileService: FilesService) {
    }

    async addImages(image1, body) {
        const filePath = await this.fileService.AddFile(image1, body.productId)
        const res = await this.imageRepository.create({...body, image: filePath})
        return res
    }

    async getImagesByProductId(id: number){
        return await this.imageRepository.findAll({where: {productId: id}})
    }

}
