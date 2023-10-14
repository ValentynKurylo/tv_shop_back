import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {FilesModule} from "../files/files.module";
import {ImageModel} from "./images.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [
    SequelizeModule.forFeature([ImageModel]),
    FilesModule,
    AuthModule,
  ]
})
export class ImagesModule {}
