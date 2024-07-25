import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.setGlobalPrefix('api/v');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v'
  });
  app.enableCors()
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
