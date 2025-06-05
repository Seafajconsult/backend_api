import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { JWT } from '../../config/constants';
import { UserRole, UserStatus } from '../../prisma/types';
import { AuthUser, JwtPayload } from '../interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Try to extract the JWT from cookies first
        (req: Request) => {
          const token = req?.cookies?.['Authentication'];
          if (!token) return null;
          return token;
        },
        // Then try Auth Header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    try {
      // Find user with specific role-based profile
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          ...(payload.role === UserRole.STUDENT && { student: true }),
          ...(payload.role === UserRole.EMPLOYER && { employer: true }),
          ...(payload.role === UserRole.ADMIN && { admin: true }),
          ...(payload.role === UserRole.SUPER_ADMIN && { superAdmin: true }),
        },
      });

      if (!user) {
        throw new UnauthorizedException('User no longer exists');
      }

      if (user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException(`Account is ${user.status.toLowerCase()}`);
      }

      // Extract profile based on role
      let profile: any;
      switch (payload.role) {
        case UserRole.STUDENT:
          profile = user.student;
          break;
        case UserRole.EMPLOYER:
          profile = user.employer;
          break;
        case UserRole.ADMIN:
          profile = user.admin;
          break;
        case UserRole.SUPER_ADMIN:
          profile = user.superAdmin;
          break;
      }

      if (!profile) {
        throw new UnauthorizedException('User profile not found');
      }

      return {
        id: user.id,
        email: user.email,
        role: user.role as UserRole,
        status: user.status as UserStatus,
        profile,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}

// Usage example:
/*
@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // { id, email, role, status, profile }
  }
}
*/
