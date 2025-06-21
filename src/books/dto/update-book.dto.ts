import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { BookCategory } from '../enums/book-category.enum';
import { UpdateBookEditionDto } from './update-book-edition.dto';

export class UpdateBookDto {
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
  @Type(() => UpdateBookEditionDto)
  @IsOptional()
  editions?: UpdateBookEditionDto[];
}
