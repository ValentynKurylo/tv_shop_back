import { Controller, Get } from '@nestjs/common';
import {AppService} from "./app.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("Hello world")
@Controller()
export class AppController {
    constructor(private appService: AppService) {
    }

    @ApiOperation({summary:'default controller'})
    @ApiResponse({status: 200, type: String})
    @Get()
    get(){
        return this.appService.getHello()
    }


}
