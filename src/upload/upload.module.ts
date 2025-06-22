import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [UploadController],
})
export class UploadModule {}
