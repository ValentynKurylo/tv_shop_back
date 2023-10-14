import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {AppController} from "./app.controller";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {ProductModule} from "./product/product.module";
import {FilesModule} from "./files/files.module";
import {ImagesModule} from "./images/images.module";
import {User} from "./users/user.model";
import {Product} from "./product/product.model";
import {ImageModel} from "./images/images.model";
import {AppService} from "./app.service";



@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [User, Product, ImageModel],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    FilesModule,
    ImagesModule,
    ServeStaticModule.forRoot({
      rootPath:  path.resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
