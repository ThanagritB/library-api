import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { In, Repository } from 'typeorm';
import { BookEdition } from './entities/book-edition.entity';
import { BookResponseDto } from './dto/book-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(BookEdition)
    private bookEditionRepository: Repository<BookEdition>,
  ) {}

  async create(dto: CreateBookDto): Promise<BookResponseDto> {
    if (Array.isArray(dto.editions) && dto.editions.length > 0) {
      const allIsbn = dto.editions?.map((e) => e.isbn) || [];

      const isExistIsbn = await this.bookEditionRepository.find({
        where: allIsbn.map((isbn) => ({ isbn })),
      });

      if (isExistIsbn.length > 0) {
        const duplicateIsbn = isExistIsbn.map((e) => e.isbn).join(', ');
        throw new BadRequestException(`Duplicate ISBN(s): ${duplicateIsbn}`);
      }
    }

    const book = this.bookRepository.create(dto);
    const saved = this.bookRepository.save(book);

    return plainToInstance(BookResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.find({
      relations: ['editions', 'editions.formats'],
    });

    return plainToInstance(BookResponseDto, books, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<BookResponseDto> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['editions', 'editions.formats'],
    });

    if (!book) throw new NotFoundException('Book not found');

    return plainToInstance(BookResponseDto, book, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, dto: UpdateBookDto): Promise<BookResponseDto> {
    if (Array.isArray(dto.editions) && dto.editions.length > 0) {
      const editions = dto.editions;

      const existingEditions = await this.bookEditionRepository.find({
        where: {
          isbn: In(editions.map((e) => e.isbn)),
        },
      });

      const existingMap = Object.fromEntries(
        existingEditions.map((e) => [e.isbn, e.id]),
      );

      for (const e of editions) {
        const matchedId = existingMap[e.isbn];

        if (matchedId && matchedId !== e.id) {
          throw new BadRequestException(`Duplicate ISBN: ${e.isbn}`);
        }
      }
    }

    const book = await this.findOne(id);
    Object.assign(book, dto);

    const saved = this.bookRepository.save(book);

    return plainToInstance(BookResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.softRemove(book);
  }

  async updateBookCover(
    bookId: string,
    originalFileName: string,
    fileUrl: string,
  ): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    book.coverFileName = originalFileName;
    book.coverUrl = fileUrl;

    return this.bookRepository.save(book);
  }
}
