import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  message?: string;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map(data => {
        // Handle paginated responses
        if (data && typeof data === 'object' && 'items' in data && 'meta' in data) {
          return {
            data: data.items,
            meta: data.meta,
            message: this.getDefaultMessage(statusCode, request.method),
            timestamp: new Date().toISOString(),
          };
        }

        // Handle regular responses
        return {
          data,
          message: this.getDefaultMessage(statusCode, request.method),
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }

  private getDefaultMessage(statusCode: number, method: string): string {
    if (statusCode === 201) {
      return 'Resource created successfully';
    }

    switch (method) {
      case 'POST':
        return 'Resource created successfully';
      case 'PUT':
      case 'PATCH':
        return 'Resource updated successfully';
      case 'DELETE':
        return 'Resource deleted successfully';
      default:
        return 'Operation completed successfully';
    }
  }
}

// Usage in main.ts:
// app.useGlobalInterceptors(new TransformInterceptor());

/* Example responses:

Regular response:
{
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2025-06-02T16:20:00.000Z"
}

Paginated response:
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  },
  "message": "Operation completed successfully",
  "timestamp": "2025-06-02T16:20:00.000Z"
}
*/
