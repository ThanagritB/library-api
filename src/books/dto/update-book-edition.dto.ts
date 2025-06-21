import {
  IsISBN,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBookFormatDto } from './update-book-format.dto';

export class UpdateBookEditionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsISBN(undefined, { message: 'Invalid ISBN (must be ISBN-10 or ISBN-13)' })
  isbn: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateBookFormatDto)
  @IsOptional()
  formats?: UpdateBookFormatDto[];
}
