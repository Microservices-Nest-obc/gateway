import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './products/exception';

async function bootstrap() {
  const logger = new Logger('NestApplication');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(env.port);

  logger.log(`Gateway listening on port ${env.port}`);
}
bootstrap();
