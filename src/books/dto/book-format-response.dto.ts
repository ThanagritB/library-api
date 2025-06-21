import { Expose, Transform } from 'class-transformer';

const ToFixedFloat = (digit = 2) =>
  Transform(({ value }) => parseFloat(parseFloat(value).toFixed(digit)));

export class BookFormatResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @ToFixedFloat(2)
  price: number;

  @Expose()
  @Transform(({ value }) => Number(value))
  stock: number;
}
