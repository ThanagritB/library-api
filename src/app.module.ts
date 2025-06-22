import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfigForRoot } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ContextMiddleware } from './common/middleware/context.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './common/context/context.interceptor';
import { ExternalApiModule } from './external-api/external-api.module';

@Module({
  imports: [
    // Load .env and set it to global. Can use in every module (No need to import again).
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Connect database with TypeORM.
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfigForRoot,
    }),

    BooksModule,

    UsersModule,

    AuthModule,

    ExternalApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
