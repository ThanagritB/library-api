import { Type } from 'class-transformer';
import {
  IsISBN,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateBookFormatDto } from './create-book-format.dto';

export class CreateBookEditionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsISBN(undefined, { message: 'Invalid ISBN (must be ISBN-10 or ISBN-13)' })
  isbn: string;

  @ValidateNested({ each: true })
  @Type(() => CreateBookFormatDto)
  @IsOptional()
  formats?: CreateBookFormatDto[];
}
