import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpAdapterHost } from '@nestjs/core';

export const CACHE_KEY_METADATA = 'cache_key';
export const CACHE_TTL_METADATA = 'cache_ttl';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';

    // Don't cache if it's not a GET request
    if (!isGetRequest) {
      return next.handle();
    }

    const cacheKey = this.buildCacheKey(context);
    const ttl = this.getCacheTTL(context);

    try {
      const cachedResponse = await this.cacheManager.get(cacheKey);
      if (cachedResponse) {
        return of(cachedResponse);
      }

      return next.handle().pipe(
        tap(response => {
          this.cacheManager.set(cacheKey, response, ttl);
        }),
      );
    } catch (error) {
      // If cache fails, proceed without caching
      return next.handle();
    }
  }

  private buildCacheKey(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const customKey = Reflect.getMetadata(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (customKey) {
      return `${customKey}:${this.buildKey(request.url, request.query)}`;
    }

    return this.buildKey(request.url, request.query);
  }

  private buildKey(url: string, query: Record<string, any>): string {
    const queryString = Object.keys(query)
      .sort()
      .map(key => `${key}=${query[key]}`)
      .join('&');

    return queryString ? `${url}?${queryString}` : url;
  }

  private getCacheTTL(context: ExecutionContext): number {
    return (
      Reflect.getMetadata(CACHE_TTL_METADATA, context.getHandler()) ||
      300 // Default 5 minutes
    );
  }
}

/**
 * Custom cache key decorator
 * @param key Base cache key
 */
export function CacheKey(key: string) {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(CACHE_KEY_METADATA, key, descriptor.value);
    return descriptor;
  };
}

/**
 * Cache TTL decorator (in seconds)
 * @param ttl Time to live in seconds
 */
export function CacheTTL(ttl: number) {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(CACHE_TTL_METADATA, ttl, descriptor.value);
    return descriptor;
  };
}

// Usage example:
/*
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Controller('students')
@UseInterceptors(CacheInterceptor)
export class StudentsController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @CacheKey('all_students')
  @CacheTTL(300) // Cache for 5 minutes
  async findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @CacheKey('student')
  @CacheTTL(60) // Cache for 1 minute
  async findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.create(createStudentDto);
    // Clear related cache entries
    await this.cacheManager.del('all_students');
    return student;
  }
}

// In app.module.ts:
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 60, // Default TTL in seconds
    }),
    // ... other imports
  ],
})
export class AppModule {}
*/
