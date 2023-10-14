import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Req,
    Request,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors, Patch
} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDTO} from "./dto/createProductDTO";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Product} from "./product.model";
import {Role} from "../guards/roleAuthDecorator";
import {roleGuards} from "../guards/roleGuard";
import {User} from "../users/user.model";
import {FileInterceptor} from "@nestjs/platform-express";
import {Op} from "sequelize";
import {Query} from "typeorm/browser/driver/Query";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {
    }

    @ApiOperation({summary:'Create product'})
    @ApiResponse({status: 200, type: Product})
    @Role("admin", "worker")
    @UseGuards(roleGuards)
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    createProduct(@Body() productDto: CreateProductDTO, @UploadedFile() image){
        return this.productService.createProduct(productDto, image)
    }

    @ApiOperation({summary:'Get all products'})
    @ApiResponse({status: 200, type: [Product]})
    @ApiOperation({summary:'get all products'})
    @ApiResponse({status: 200, type: [Product]})
    @Get()
    getProducts(@Req() req: any){
        const queryParams = req.query
        const whereClause: any = {};
        if (queryParams['type']) whereClause.type = queryParams['type'];
        if (queryParams['name']) whereClause.name = queryParams['name'];
        if (queryParams['minPrice']) whereClause.price = { ...whereClause.price, [Op.gte]: Number(queryParams['minPrice'])};
        if (queryParams['maxPrice']) whereClause.price = { ...whereClause.price, [Op.lte]: (queryParams['maxPrice']) };
        if (queryParams['minYear']) whereClause.year = { ...whereClause.year, [Op.gte]: (queryParams['minYear']) };
        if (queryParams['maxYear']) whereClause.year = { ...whereClause.year, [Op.lte]: (queryParams['maxYear']) };
        console.log(whereClause)
        let sort;
        switch (queryParams['sortBy']) {
            case 'price':
                sort = [['price', 'ASC']];
                break;
            case 'year':
                sort = [['year', 'ASC']];
                break;
            case 'name':
                sort = [['name', 'ASC']];
                break;
            default:
                sort = [['createdAt', 'DESC']];
                break;
        }
        return this.productService.getProducts(whereClause, sort)
    }

    @ApiOperation({summary:'Get product by id'})
    @ApiResponse({status: 200, type: Product})
    @Get('ById/:id')
    getProductById(@Param('id')id: number){
        return this.productService.getProductById(id)
    }

    @ApiOperation({summary:'Get product by type'})
    @ApiResponse({status: 200, type: [Product]})
    @Get('/ByType/:type')
    getProductsByType(@Param('type')type: string){
        return this.productService.getProductByType(type)
    }

    @ApiOperation({summary:'Get product by name'})
    @ApiResponse({status: 200, type: [Product]})
    @Get('ByName/:name')
    getProductByName(@Param('name')name: string){
        return this.productService.getProductByName(name)
    }

    @ApiOperation({summary:'Get available product'})
    @ApiResponse({status: 200, type: [Product]})
    @Get('available/:bool')
    getAvailableProducts(@Param('bool')b: boolean){
        return this.productService.getAvailableProduct(b)
    }

    @ApiOperation({summary:'Get product by status'})
    @ApiResponse({status: 200, type: [Product]})
    @Get('ByStatus/:status')
    getProductByStatus(@Param('status') status: string){
        return this.productService.getProductByStatus(status)
    }

    @ApiOperation({summary:'Put product'})
    @ApiResponse({status: 200, type: String})
    @Role("admin", "worker")
    @UseGuards(roleGuards)
    @Put('/:id')
    async putProduct(@Body() body: CreateProductDTO, @Param('id') id: number) {
        const res = await this.productService.putProduct(id, body)
        return res
    }

    @ApiOperation({summary:'add image to product'})
    @ApiResponse({status: 200, type: Product})
    @UseInterceptors(FileInterceptor('image'))
    @Patch('/image/:id')
    async patchImage(@UploadedFile() image, @Param('id')id: number){
        const res = await this.productService.patchImage(image, id)
        return res
    }


    @ApiOperation({summary:'Delete product'})
    @ApiResponse({status: 200, type: String})
    @Role("admin", "worker")
    @UseGuards(roleGuards)
    @Delete('/:id')
    async deleteProduct(@Param('id')id: number){
        await this.productService.deleteProduct(id)
        return "Product was deleted"
    }

    @ApiOperation({summary:'get all types of product'})
    @ApiResponse({status: 200, type: [String]})
    @Get('/types')
    getTypes(){
        return this.productService.getTypes()
    }

    @ApiOperation({summary:'get all models of product'})
    @ApiResponse({status: 200, type: [String]})
    @Get('/models')
    getModels(@Req() request: any){

        const query = request.query
        const type = query['type'];
        if(type) {
            return this.productService.getModels(type)
        }else {
            return this.productService.getModels()
        }
    }

}
