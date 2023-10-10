import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { patchNestJsSwagger, applyFormats } from 'nestjs-typebox';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

patchNestJsSwagger();
applyFormats();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Assets Service')
    .setDescription('API definition for Demo Up - Asset application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
