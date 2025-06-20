import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // If has some field that not contain in DTO, it will error 400 Bad request.
      transform: true, // Convert type.
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
