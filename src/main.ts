import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
      .setTitle("TV STORE").setDescription("You can buy some tv")
      .setVersion("1.0.0").addTag("TV").build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/tv", app, document)

  await app.listen(process.env.PORT, ()=>{console.log(`Server start on port ${process.env.PORT}`)});


}
bootstrap();
