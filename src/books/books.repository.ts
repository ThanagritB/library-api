import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class BooksRepository extends BaseRepository<Book> {
  constructor(private readonly dataSource: DataSource) {
    super(Book, dataSource);
  }

  async findWithFilters(query: PaginationQueryDto): Promise<[Book[], number]> {
    const filters: Record<string, string> = {};
    if (query.category) {
      filters['category'] = query.category;
    }

    return this.paginate(
      'book',
      query,
      ['title', 'author'],
      ['title', 'createdAt'],
      filters,
    );
  }
}
