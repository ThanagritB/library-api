import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const originEnv = process.env.ALLOWED_ORIGINS || '';
  const allowedOrigins = originEnv.split(',').map((origin) => origin.trim());

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS Not Allowed'));
      }
    },
    credentials: true,
  });

  app.use(bodyParser.json({ limit: '10mb' })); // ✅ JSON body limit
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // ✅ Form body limit

  if (process.env.APP_ENV !== 'prod') {
    // Error handling
    app.useGlobalFilters(new HttpExceptionFilter());
  }

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTransformInterceptor(),
  );

  // Serve static files from "uploads" folder
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // URL path prefix
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove field not contain in DTO.
      forbidNonWhitelisted: true, // If has some field that not contain in DTO, it will error 400 Bad request.
      transform: true, // Convert type.
    }),
  );

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
