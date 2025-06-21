import { Expose, Type } from 'class-transformer';
import { BookCategory } from '../enums/book-category.enum';
import { BookEditionResponseDto } from './book-edition-response.dto';

export class BookResponseDto {
  @Expose()
  id: string;

  @Expose({ name: 'title' })
  bookTitle: string;

  @Expose()
  author: string;

  @Expose()
  publishedYear: number;

  @Expose()
  editionCount: number;

  @Expose()
  category: BookCategory;

  @Expose()
  @Type(() => BookEditionResponseDto)
  editions?: BookEditionResponseDto[];
}
