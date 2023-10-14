import {Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ImagesService} from "./images.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Role} from "../guards/roleAuthDecorator";
import {roleGuards} from "../guards/roleGuard";
import {ImageModel} from "./images.model";

@Controller('images')
export class ImagesController {
    constructor(private imagesService: ImagesService) {
    }

    @ApiOperation({summary:'Create image'})
    @ApiResponse({status: 200, type: ImageModel})
    @Role("admin", "worker")
    @UseGuards(roleGuards)
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    async postImage(@Body()body, @UploadedFile()image){
        return await this.imagesService.addImages(image, body)
    }

    @ApiOperation({summary:'get all images'})
    @ApiResponse({status: 200, type: [ImageModel]})
    @Get('byProductId/:id')
    async getAllByProductId(@Param('id')id: number){
        return await this.imagesService.getImagesByProductId(id)
    }

}
