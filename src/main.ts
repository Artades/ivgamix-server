import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

config();


async function bootstrap() {
 
  const app = await NestFactory.create(AppModule, { cors: false });

   app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Ivgamix')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(7777);
  console.log(`Server has been run on: 7777 port`);
}
bootstrap();
