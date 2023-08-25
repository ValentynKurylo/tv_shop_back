import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "./product.model";
import {AuthModule} from "../auth/auth.module";
import {FilesModule} from "../files/files.module";


@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([Product]),
      AuthModule,
      FilesModule
  ]
})
export class ProductModule {}
