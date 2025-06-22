import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(String(value)))
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(String(value)))
  @IsPositive()
  limit: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsString()
  category?: string;
}
