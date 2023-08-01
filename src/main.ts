import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigureSwagger } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  ConfigureSwagger(app);

  app.setGlobalPrefix('api');

  const port = app.get(ConfigService).get<number>('port');
  await app.listen(port);
}

bootstrap();
