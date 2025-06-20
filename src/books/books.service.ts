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

  async create(dto: CreateBookDto): Promise<BookResponseDto> {
    const book = this.bookRepository.create(dto);
    await this.bookRepository.save(book);

    return plainToInstance(BookResponseDto, book, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.find({ relations: ['editions'] });

    return plainToInstance(BookResponseDto, books, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<BookResponseDto> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['editions'],
    });

    if (!book) throw new NotFoundException('Book not found');

    return plainToInstance(BookResponseDto, book, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, dto: UpdateBookDto): Promise<BookResponseDto> {
    const book = await this.findOne(id);
    Object.assign(book, dto);
    await this.bookRepository.save(book);

    return plainToInstance(BookResponseDto, book, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);

    await this.bookRepository.softRemove(book);
  }
}
