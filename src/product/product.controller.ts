import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDTO} from "./dto/createProductDTO";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Product} from "./product.model";
import {Role} from "../auth/roleAuthDecorator";
import {roleGuards} from "../auth/roleGuard";
import {User} from "../users/user.model";
import {FileInterceptor} from "@nestjs/platform-express";
import {Op} from "sequelize";

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
    getProducts(){
        return this.productService.getProducts()
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
    putProduct(@Body() body: CreateProductDTO, @Param('id')id: number){
        this.productService.putProduct(id, body)
        return "Product was updated"
    }


    @ApiOperation({summary:'Delete product'})
    @ApiResponse({status: 200, type: String})
    @Role("admin", "worker")
    @UseGuards(roleGuards)
    @Delete('/:id')
    deleteProduct(@Param('id')id: number){
        this.productService.deleteProduct(id)
        return "Product was deleted"
    }

    @Get('/types')
    getTypes(){
        return this.productService.getTypes()
    }

    @Get('/models')
    getModels(){}

    @Get()
    findAll(queryParams: any){
        const { type, minPrice, maxPrice, minYear, maxYear } = queryParams;

        const whereClause: any = {};
        if (type) whereClause.type = type;
        if (minPrice) whereClause.price = { ...whereClause.price, [Op.gte]: minPrice };
        if (maxPrice) whereClause.price = { ...whereClause.price, [Op.lte]: maxPrice };
        if (minYear) whereClause.year = { ...whereClause.year, [Op.gte]: minYear };
        if (maxYear) whereClause.year = { ...whereClause.year, [Op.lte]: maxYear };

        return this.productService.getAllByQuery(whereClause);
    }
}
