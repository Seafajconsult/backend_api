import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtConfig } from '../config/jwt.config';
import { EmailService } from '../utils/email';
import { OtpService } from '../utils/otp';
import { EncryptionService } from '../utils/encryption';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtConfig,
    EmailService,
    OtpService,
    EncryptionService,
  ],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
