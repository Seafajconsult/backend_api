import { ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
export declare class CustomThrottlerGuard extends ThrottlerGuard {
    protected getTracker(req: Record<string, any>): Promise<string>;
    protected throwThrottlingException(): Promise<void>;
    protected shouldSkip(context: ExecutionContext): Promise<boolean>;
    private isWhitelisted;
    private isAdmin;
}
