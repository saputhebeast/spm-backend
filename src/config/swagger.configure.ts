import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function ConfigureSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Nest Sample')
    .setDescription('Nest Sample')
    .setVersion('1.0')
    .addTag('Archtype2K')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
