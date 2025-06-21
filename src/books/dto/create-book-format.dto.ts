import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBookFormatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be greater than 0' })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;
}
