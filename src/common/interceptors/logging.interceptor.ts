import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<Request>();
    const method = req.method;
    const url = req.url;

    this.logger.log(`➡️ ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const timeTaken = Date.now() - now;
        this.logger.log(`⬅️ ${method} ${url} (${timeTaken}ms)`);
      }),
    );
  }
}
