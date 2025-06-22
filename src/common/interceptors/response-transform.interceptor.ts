import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

export class ResponseTransformInterceptor implements NestInterceptor {
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: T) => {
        const response = context.switchToHttp().getResponse<Response>();
        return {
          statusCode: response.statusCode ?? 200,
          timestamp: new Date().toISOString(),
          data,
        };
      }),
    );
  }
}
