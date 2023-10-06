import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cfg = new DocumentBuilder()
    .setTitle('BaumanAPI documentation')
    .setDescription(
      'Данный сервис был разработан, как дипломный проект для кафедры ИУК5',
    )
    .setVersion('0.0.1')
    .addTag('Backend')
    .build();
  const document = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('api', app, document);

  await app.listen(7000);
}
bootstrap();
