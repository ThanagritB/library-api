import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfigForRoot } from './config/typeorm.config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
