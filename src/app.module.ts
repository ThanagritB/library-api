import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Load .env and set it to global. Can use in every module (No need to import again).
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Connect database with data in .env.
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: process.env.APP_ENV === 'dev', // It will create/update data schema automatically. (Use only dev!)
        logging: true,
      }),
    }),

    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
