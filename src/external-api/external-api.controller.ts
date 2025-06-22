import { BookMetadataDto } from './dto/book-metadata.dto';
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('external-api')
export class ExternalApiController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @UseGuards(JwtAuthGuard)
  @Get('book')
  async getBookByIsbn(@Query('isbn') isbn: string): Promise<BookMetadataDto> {
    if (!isbn) {
      throw new BadRequestException('ISBN is required');
    }

    return this.externalApiService.getBookMetadata(isbn);
  }
}
