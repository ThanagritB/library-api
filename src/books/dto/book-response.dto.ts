import { Expose } from 'class-transformer';

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
}
