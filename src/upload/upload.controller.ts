import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, StorageEngine } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { UploadFile } from '../types/upload-file.interface';
import { BooksService } from '../books/books.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

const uploadPath = './uploads/covers';

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}

const coverStorage: StorageEngine = diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadPath);
  },
  filename: (_req, file, callback) => {
    const ext = extname(file.originalname);
    const fileName = `cover_${Date.now()}${ext}`;
    callback(null, fileName);
  },
});

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly booksService: BooksService) {}

  @Post('book-cover/:bookId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: coverStorage,
      fileFilter: (_req, file, callback) => {
        const isImage =
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg';

        if (!isImage) {
          return callback(
            new BadRequestException('Only JPEG, PNG, or JPG files allowed'),
            false,
          );
        }

        callback(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
    }),
  )
  async uploadFile(
    @Param('bookId') bookId: string,
    @UploadedFile() file: UploadFile,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const originalFileName = file.originalname;
    const fileName = file.filename;
    const fileUrl = `/uploads/covers/${fileName}`;

    await this.booksService.updateBookCover(bookId, originalFileName, fileUrl);

    return {
      message: 'File uploaded and book updated successfully.',
      fileName,
      url: fileUrl,
    };
  }
}
