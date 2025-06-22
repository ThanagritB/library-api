import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BookMetadataDto } from './dto/book-metadata.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

type OpenLibraryBookRaw = {
  title?: string;
  authors?: { name: string }[];
  publish_date?: string;
  cover?: {
    small?: string;
    medium?: string;
    large?: string;
  };
};

@Injectable()
export class ExternalApiService {
  private readonly logger = new Logger(ExternalApiService.name);

  constructor(private readonly httpService: HttpService) {}

  async getBookMetadata(isbn: string): Promise<BookMetadataDto> {
    const url = 'https://openlibrary.org/api/books';
    const params = {
      bibkeys: `ISBN:${isbn}`,
      format: 'json',
      jscmd: 'data',
    };

    try {
      const response: AxiosResponse<Record<string, OpenLibraryBookRaw>> =
        await firstValueFrom(this.httpService.get(url, { params }));

      const data = response.data[`ISBN:${isbn}`];
      if (!data) {
        throw new Error('No data found for this ISBN: ' + isbn);
      }

      return new BookMetadataDto({
        isbn,
        title: data.title,
        author: data.authors?.[0]?.name ?? 'Unknown',
        publishDate: data.publish_date,
        coverUrl: data.cover?.medium || data.cover?.large || undefined,
      });
    } catch (error) {
      let message = 'Unknown';

      if (error instanceof Error) {
        message = error.message;
      }

      this.logger.error(
        `❌ Failed to fetch metadata for ISBN ${isbn}: ${message}`,
      );
      throw new InternalServerErrorException('Failed to fetch book metadata');
    }
  }
}
