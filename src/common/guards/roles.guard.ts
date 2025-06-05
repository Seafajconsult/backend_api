import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enums/user-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || !requiredRoles.length) {
      return true; // No roles specified means endpoint is public
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // No user means not authenticated
    if (!user) {
      return false;
    }

    // Check if user's role is included in required roles
    return this.matchRoles(requiredRoles, user.role);
  }

  private matchRoles(requiredRoles: UserRole[], userRole: UserRole): boolean {
    // Super admin has access to everything
    if (userRole === UserRole.SUPER_ADMIN) {
      return true;
    }

    return requiredRoles.includes(userRole);
  }
}

// Usage example:
/*
@Controller('students')
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
export class StudentsController {
  @Get()
  @Roles(UserRole.STUDENT) // This will override the controller-level roles
  findAll() {
    // Only students can access this endpoint
  }

  @Post()
  create() {
    // Only admins and super admins can access this endpoint (inherited from controller)
  }
}
*/
