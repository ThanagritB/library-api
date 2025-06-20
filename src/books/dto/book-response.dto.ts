import { Expose } from 'class-transformer';
import { BookCategory } from '../enums/book-category.enum';

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
}
