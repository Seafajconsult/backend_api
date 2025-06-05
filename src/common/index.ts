// Guards
export * from './guards/roles.guard';
export * from './guards/jwt-auth.guard';
export * from './guards/throttle.guard';

// Interceptors
export * from './interceptors/transform.interceptor';
export * from './interceptors/logging.interceptor';
export * from './interceptors/timeout.interceptor';
export * from './interceptors/cache.interceptor';

// Pipes
export * from './pipes/validation.pipe';

// Filters
export * from './filters/http-exception.filter';

// Enums
export * from './enums/user-role.enum';

// Decorators (Meta)
export const Public = () => Reflect.metadata('isPublic', true);
export const NoCache = () => Reflect.metadata('no-cache', true);
export const NoTransform = () => Reflect.metadata('no-transform', true);

// Custom Decorators
export function ApiFile(fieldName: string = 'file') {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata('swagger/apiFile', { fieldName }, descriptor.value);
    return descriptor;
  };
}

// Response Types
export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
  meta?: Record<string, any>;
}

// Common Types
export type Optional<T> = T | null | undefined;
export type WithId<T> = T & { id: string };
export type WithTimestamps<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};
