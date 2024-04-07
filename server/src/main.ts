import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: true,
      allowedHeaders: "*"
    }
  });

  const config = app.get(ConfigService);

  const prefix = config.get<string>('API_PREFIX');
  const v = config.get<string>('API_VERSION');

  app.setGlobalPrefix(`${prefix}/${v}`);



  const port: number = config.get<number>('port');

  const cfg = new DocumentBuilder()
    .setTitle('BaumanAPI documentation')
    .setDescription(
      'Данный сервис был разработан, как дипломный проект для кафедры ИУК5',
    )
    .setVersion('0.0.1')
    .addTag('Backend')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    }
  });

  await app.listen(port || 7000);
}
bootstrap();
