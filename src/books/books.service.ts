import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { BookResponseDto } from './dto/book-response.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(dto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(dto);
    return this.bookRepository.save(book);
  }

  async findAll(): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.find({ relations: ['editions'] });

    return plainToInstance(BookResponseDto, books, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['editions'],
    });

    if (!book) throw new NotFoundException('Book not found');

    return book;
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, dto);

    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);

    await this.bookRepository.softRemove(book);
  }
}
