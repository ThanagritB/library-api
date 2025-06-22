import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.APP_ENV !== 'prod') {
    // Error handling
    app.useGlobalFilters(new HttpExceptionFilter());
  }

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTransformInterceptor(),
  );

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove field not contain in DTO.
      forbidNonWhitelisted: true, // If has some field that not contain in DTO, it will error 400 Bad request.
      transform: true, // Convert type.
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
