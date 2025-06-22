import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookEdition } from './entities/book-edition.entity';
import { BooksRepository } from './books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookEdition])],
  controllers: [BooksController],
  providers: [
    BooksService,
    { provide: BooksRepository, useClass: BooksRepository },
  ],
  exports: [BooksService, BooksRepository],
})
export class BooksModule {}
