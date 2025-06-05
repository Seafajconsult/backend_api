import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any) {
    // Handle specific JWT errors
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token has expired');
    }
    
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token');
    }

    // Handle other errors or no user
    if (err || !user) {
      throw new UnauthorizedException(
        err?.message || 'Authentication required'
      );
    }

    return user;
  }

  async canActivate(context: ExecutionContext) {
    // Check for public route decorator
    const isPublic = Reflect.getMetadata('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    // Add user to request if authenticated
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    // Check user status
    if (result && request.user) {
      if (request.user.status === 'SUSPENDED') {
        throw new UnauthorizedException('Account is suspended');
      }
      if (request.user.status === 'INACTIVE') {
        throw new UnauthorizedException('Account is inactive');
      }
    }

    return result;
  }
}

// Public route decorator
export const Public = () => Reflect.metadata('isPublic', true);

// Usage example:
/*
@Controller('auth')
export class AuthController {
  @Public()
  @Post('login')
  login() {
    // Public endpoint, no auth required
  }

  @Get('profile')
  getProfile() {
    // Protected endpoint, requires valid JWT
  }
}
*/
