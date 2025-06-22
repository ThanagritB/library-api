export class BookMetadataDto {
  isbn: string;
  title: string;
  author: string;
  publishDate?: string;
  coverUrl: string;

  constructor(partial: Partial<BookMetadataDto>) {
    Object.assign(this, partial);
  }
}
