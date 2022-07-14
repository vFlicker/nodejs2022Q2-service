import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await readFile(resolve(__dirname, '../doc/api.yaml'), 'utf8');
  const document = parse(config);

  SwaggerModule.setup('doc', app, document);
  await app.listen(4000);
}
bootstrap();
