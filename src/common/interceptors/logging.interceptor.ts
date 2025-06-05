import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, path: url } = request;
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const userAgent = request.get('user-agent') || '';
    const userId = request.user?.id || 'anonymous';

    const now = Date.now();
    const requestId = this.generateRequestId();

    // Log the incoming request
    this.logger.log(
      `[${requestId}] Incoming ${method} ${url} from ${userId} (${userAgent})`,
    );

    // Log request body for POST/PUT/PATCH methods
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      // Mask sensitive data in request body
      const maskedBody = this.maskSensitiveData(request.body);
      this.logger.debug(
        `[${requestId}] Request Body: ${JSON.stringify(maskedBody)}`,
      );
    }

    return next.handle().pipe(
      tap({
        next: (data: any) => {
          // Log successful response
          const responseTime = Date.now() - now;
          this.logger.log(
            `[${requestId}] ${className}.${handlerName} completed in ${responseTime}ms`,
          );

          // Log response data in development
          if (process.env.NODE_ENV === 'development') {
            const maskedResponse = this.maskSensitiveData(data);
            this.logger.debug(
              `[${requestId}] Response: ${JSON.stringify(maskedResponse)}`,
            );
          }
        },
        error: (error: any) => {
          // Log error response
          const responseTime = Date.now() - now;
          this.logger.error(
            `[${requestId}] ${className}.${handlerName} failed in ${responseTime}ms: ${error.message}`,
            error.stack,
          );
        },
      }),
    );
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private maskSensitiveData(data: any): any {
    if (!data) return data;

    const sensitiveFields = [
      'password',
      'token',
      'secret',
      'authorization',
      'cookie',
      'cardNumber',
      'cvv',
    ];

    const masked = { ...data };

    const maskObject = (obj: any) => {
      for (const key in obj) {
        if (obj[key] === null || obj[key] === undefined) continue;

        if (typeof obj[key] === 'object') {
          maskObject(obj[key]);
        } else if (
          sensitiveFields.some(field => 
            key.toLowerCase().includes(field.toLowerCase())
          )
        ) {
          obj[key] = '********';
        }
      }
    };

    maskObject(masked);
    return masked;
  }
}

// Usage in main.ts:
// app.useGlobalInterceptors(new LoggingInterceptor());
