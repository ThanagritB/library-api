import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { BookCategory } from '../enums/book-category.enum';
import { CreateBookEditionDto } from './create-book-edition.dto';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1000)
  @Max(2100)
  publishedYear: number;

  @IsEnum(BookCategory)
  @IsOptional()
  category?: BookCategory;

  @ValidateNested({ each: true })
  @Type(() => CreateBookEditionDto)
  @IsOptional()
  editions?: CreateBookEditionDto[];
}
