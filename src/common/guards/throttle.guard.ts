import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): Promise<string> {
    // Use IP address or API key or user ID as tracker
    return Promise.resolve(req.ips.length ? req.ips[0] : req.ip);
  }

  protected async throwThrottlingException(): Promise<void> {
    throw new ThrottlerException('Too many requests. Please try again later.');
  }

  protected async shouldSkip(
    context: ExecutionContext,
  ): Promise<boolean> {
    // Skip rate limiting for whitelisted IPs or admin users
    const req = context.switchToHttp().getRequest();
    if (this.isWhitelisted(req) || this.isAdmin(req)) {
      return true;
    }
    return false;
  }

  private isWhitelisted(req: Record<string, any>): boolean {
    const whitelistedIPs = ['127.0.0.1', 'localhost'];
    const clientIP = req.ips.length ? req.ips[0] : req.ip;
    return whitelistedIPs.includes(clientIP);
  }

  private isAdmin(req: Record<string, any>): boolean {
    const user = req.user;
    if (!user) return false;
    return ['ADMIN', 'SUPER_ADMIN'].includes(user.role);
  }
}

// Usage with route decorators:
/*
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  @Throttle({ default: { ttl: 60000, limit: 5 } }) // 5 requests per minute
  @Post('login')
  login() {}
}
*/

// Or globally in app.module.ts:
/*
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
*/
