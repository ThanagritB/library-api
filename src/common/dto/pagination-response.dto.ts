export class PaginationResponseDto<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;

  constructor(partial: Partial<PaginationResponseDto<T>>) {
    Object.assign(this, partial);
  }
}
