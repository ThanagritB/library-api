import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

// PartialType() is create DTO that every field is optional.
export class UpdateBookDto extends PartialType(CreateBookDto) {}
