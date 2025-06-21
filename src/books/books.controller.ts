import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { plainToInstance } from 'class-transformer';
import { BookResponseDto } from './dto/book-response.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const book = await this.booksService.create(createBookDto);

    return plainToInstance(BookResponseDto, book, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll() {
    const books = await this.booksService.findAll();

    return plainToInstance(BookResponseDto, books, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const book = await this.booksService.findOne(id);

    return plainToInstance(BookResponseDto, book, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const book = this.booksService.update(id, updateBookDto);

    return plainToInstance(BookResponseDto, book, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.booksService.remove(id);
  }
}
