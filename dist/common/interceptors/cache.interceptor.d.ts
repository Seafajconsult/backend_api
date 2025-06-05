import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';
import { HttpAdapterHost } from '@nestjs/core';
export declare const CACHE_KEY_METADATA = "cache_key";
export declare const CACHE_TTL_METADATA = "cache_ttl";
export declare class CacheInterceptor implements NestInterceptor {
    private cacheManager;
    private readonly httpAdapterHost;
    constructor(cacheManager: Cache, httpAdapterHost: HttpAdapterHost);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    private buildCacheKey;
    private buildKey;
    private getCacheTTL;
}
export declare function CacheKey(key: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function CacheTTL(ttl: number): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
