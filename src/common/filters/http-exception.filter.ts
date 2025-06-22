import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    const path = request.url;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorName = 'InternalServerError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exResponse = exception.getResponse();

      if (typeof exResponse === 'string') {
        message = exResponse;
      } else if (typeof exResponse === 'object' && exResponse != null) {
        const res = exResponse as Record<string, any>;
        message = exception.message;
        errorName = String(res.error || exception.name);
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorName = exception.name;
    }

    this.logger.error(`[${status}] ${request.method} ${path} - ${message}`);

    response.status(status).json({
      statusCode: status,
      timestamp,
      path,
      error: errorName,
      message,
    });
  }
}
