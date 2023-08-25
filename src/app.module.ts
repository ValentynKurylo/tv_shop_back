import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {User} from "./users/user.model";
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import {Product} from "./product/product.model";
import { FilesModule } from './files/files.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [User, Product],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    FilesModule,
  ],
})
export class AppModule {}
