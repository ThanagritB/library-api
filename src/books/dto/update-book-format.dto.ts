import { PartialType } from '@nestjs/mapped-types';
import { CreateBookFormatDto } from './create-book-format.dto';

export class UpdateBookFormatDto extends PartialType(CreateBookFormatDto) {}
