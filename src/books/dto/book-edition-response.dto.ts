import { Expose, Type } from 'class-transformer';
import { BookFormatResponseDto } from './book-format-response.dto';

export class BookEditionResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  isbn: string;

  @Expose()
  @Type(() => BookFormatResponseDto)
  formats?: BookFormatResponseDto[];
}
