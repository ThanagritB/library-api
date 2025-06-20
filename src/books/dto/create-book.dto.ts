import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { BookCategory } from '../enums/book-category.enum';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(1000)
  @Max(2100)
  publishedYear: number;

  @IsEnum(BookCategory)
  @IsOptional()
  category?: BookCategory;
}
