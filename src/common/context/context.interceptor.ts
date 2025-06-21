import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { RequestContext } from '../context/request-context';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return new Observable((observer) => {
      RequestContext.run(() => {
        const req = context.switchToHttp().getRequest<Request>();
        const user = req.user as User;

        if (user?.id) {
          RequestContext.setUserId(user.id);
          console.log('✅ user.id set in context:', user.id);
        } else {
          console.warn('⚠️ no user found in request');
        }

        next.handle().subscribe({
          next: (value) => observer.next(value),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      });
    });
  }
}
