import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(1000)
  @Max(2100)
  publishedYear: number;
}
