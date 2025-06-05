import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly timeoutDuration: number = 30000) {} // Default 30 seconds

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Skip timeout for long-polling or WebSocket connections
    if (this.isWebSocket(context) || this.isLongPolling(context)) {
      return next.handle();
    }

    return next.handle().pipe(
      timeout(this.timeoutDuration),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException(
            'Request processing timeout. Please try again.'
          ));
        }
        return throwError(() => err);
      }),
    );
  }

  private isWebSocket(context: ExecutionContext): boolean {
    return context.getType() === 'ws';
  }

  private isLongPolling(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request?.headers?.['x-long-polling'] === 'true';
  }
}

/**
 * Configure timeout duration per route using this decorator
 * @param duration Timeout duration in milliseconds
 */
export function SetTimeout(duration: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      
      if (result instanceof Promise) {
        return Promise.race([
          result,
          new Promise((_, reject) => {
            setTimeout(() => {
              reject(new RequestTimeoutException(
                'Request processing timeout. Please try again.'
              ));
            }, duration);
          }),
        ]);
      }
      
      return result;
    };
    
    return descriptor;
  };
}

// Usage example:
/*
// Global usage in main.ts:
app.useGlobalInterceptors(new TimeoutInterceptor(5000)); // 5 seconds timeout

// Or per-controller with custom timeout:
@Controller('long-running')
@UseInterceptors(new TimeoutInterceptor(60000)) // 60 seconds timeout
export class LongRunningController {
  @Get()
  @SetTimeout(10000) // 10 seconds timeout for this specific route
  async longRunningOperation() {
    // ... implementation
  }
}
*/
