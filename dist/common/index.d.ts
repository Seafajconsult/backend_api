export * from './guards/roles.guard';
export * from './guards/jwt-auth.guard';
export * from './guards/throttle.guard';
export * from './interceptors/transform.interceptor';
export * from './interceptors/logging.interceptor';
export * from './interceptors/timeout.interceptor';
export * from './interceptors/cache.interceptor';
export * from './pipes/validation.pipe';
export * from './filters/http-exception.filter';
export * from './enums/user-role.enum';
export declare const Public: () => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare const NoCache: () => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare const NoTransform: () => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function ApiFile(fieldName?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
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
export type Optional<T> = T | null | undefined;
export type WithId<T> = T & {
    id: string;
};
export type WithTimestamps<T> = T & {
    createdAt: Date;
    updatedAt: Date;
};
