import { ExecutionContext } from '@nestjs/common';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    constructor();
    handleRequest(err: any, user: any, info: any): any;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const Public: () => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export {};
