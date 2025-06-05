import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../utils/email';
import { OtpService } from '../utils/otp';
import { EncryptionService } from '../utils/encryption';
import { RegisterDto, LoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, AuthResponseDto } from './dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    private emailService;
    private otpService;
    private encryptionService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, emailService: EmailService, otpService: OtpService, encryptionService: EncryptionService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        applicationId?: string;
    }>;
    private registerStudent;
    private registerEmployer;
    private registerAdmin;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    verifyEmail(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private generateTokens;
    private generateApplicationId;
    private generateReferralCode;
}
