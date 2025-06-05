import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class TimeoutInterceptor implements NestInterceptor {
    private readonly timeoutDuration;
    constructor(timeoutDuration?: number);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private isWebSocket;
    private isLongPolling;
}
export declare function SetTimeout(duration: number): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
