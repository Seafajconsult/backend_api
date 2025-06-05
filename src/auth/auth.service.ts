import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRole, UserStatus } from '../prisma/types';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../utils/email';
import { OtpService } from '../utils/otp';
import { EncryptionService } from '../utils/encryption';
import {
  RegisterDto,
  StudentRegisterDto,
  EmployerRegisterDto,
  AdminRegisterDto,
  LoginDto,
  VerifyOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  AuthResponseDto,
} from './dto';
import { JwtPayload, AuthUser } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
    private otpService: OtpService,
    private encryptionService: EncryptionService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string; applicationId?: string }> {
    const { email, password, role } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user and profile based on role
    let result;
    switch (role) {
      case UserRole.STUDENT:
        result = await this.registerStudent(registerDto as StudentRegisterDto, hashedPassword);
        break;
      case UserRole.EMPLOYER:
        result = await this.registerEmployer(registerDto as EmployerRegisterDto, hashedPassword);
        break;
      case UserRole.ADMIN:
        result = await this.registerAdmin(registerDto as AdminRegisterDto, hashedPassword);
        break;
      default:
        throw new BadRequestException('Invalid user role');
    }

    // Send verification email
    const otp = this.otpService.generateOtp();
    await this.otpService.storeOtp(email, otp);
    await this.emailService.sendVerificationEmail(email, otp);

    return result;
  }

  private async registerStudent(
    studentDto: StudentRegisterDto,
    hashedPassword: string,
  ): Promise<{ message: string; applicationId: string }> {
    const applicationId = this.generateApplicationId();
    const referralCode = this.generateReferralCode();

    const user = await this.prisma.user.create({
      data: {
        email: studentDto.email,
        password: hashedPassword,
        role: UserRole.STUDENT,
        student: {
          create: {
            applicationId,
            firstName: studentDto.firstName,
            lastName: studentDto.lastName,
            dateOfBirth: new Date(studentDto.dateOfBirth),
            nationality: studentDto.nationality,
            phone: studentDto.phone,
            address: studentDto.address,
            currentEducation: studentDto.currentEducation,
            referralCode,
            referredBy: studentDto.referredBy,
          },
        },
      },
    });

    // Send welcome email with application ID
    await this.emailService.sendWelcomeEmail(
      studentDto.email,
      `${studentDto.firstName} ${studentDto.lastName}`,
      applicationId,
    );

    return {
      message: 'Student registration successful. Please verify your email.',
      applicationId,
    };
  }

  private async registerEmployer(
    employerDto: EmployerRegisterDto,
    hashedPassword: string,
  ): Promise<{ message: string }> {
    await this.prisma.user.create({
      data: {
        email: employerDto.email,
        password: hashedPassword,
        role: UserRole.EMPLOYER,
        employer: {
          create: {
            companyName: employerDto.companyName,
            registrationNumber: employerDto.registrationNumber,
            companySize: employerDto.companySize,
            industry: employerDto.industry,
            website: employerDto.website,
            address: employerDto.address,
            phone: employerDto.phone,
          },
        },
      },
    });

    return {
      message: 'Employer registration successful. Please verify your email and wait for admin approval.',
    };
  }

  private async registerAdmin(
    adminDto: AdminRegisterDto,
    hashedPassword: string,
  ): Promise<{ message: string }> {
    await this.prisma.user.create({
      data: {
        email: adminDto.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE, // Admins are activated immediately
        admin: {
          create: {
            firstName: adminDto.firstName,
            lastName: adminDto.lastName,
            department: adminDto.department,
            assignedRole: adminDto.assignedRole,
          },
        },
      },
    });

    return {
      message: 'Admin registration successful. Please verify your email.',
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find user with profile
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        employer: true,
        admin: true,
        superAdmin: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check user status
    if (user.status === UserStatus.PENDING) {
      throw new UnauthorizedException('Please verify your email first');
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedException('Your account has been suspended');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException('Your account is inactive');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Get profile based on role
    let profile;
    switch (user.role) {
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

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role as UserRole,
        status: user.status as UserStatus,
        profile,
      },
    };
  }

  async verifyEmail(verifyOtpDto: VerifyOtpDto): Promise<{ message: string }> {
    const { email, otp } = verifyOtpDto;

    // Verify OTP
    const isValidOtp = await this.otpService.verifyOtp(email, otp);
    if (!isValidOtp) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // Update user status
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { email },
      data: { status: UserStatus.ACTIVE },
    });

    // Clear OTP
    await this.otpService.clearOtp(email);

    return { message: 'Email verified successfully' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If the email exists, a reset code has been sent' };
    }

    // Generate and send OTP
    const otp = this.otpService.generateOtp();
    await this.otpService.storeOtp(email, otp);
    await this.emailService.sendPasswordResetEmail(email, otp);

    return { message: 'If the email exists, a reset code has been sent' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { email, otp, newPassword } = resetPasswordDto;

    // Verify OTP
    const isValidOtp = await this.otpService.verifyOtp(email, otp);
    if (!isValidOtp) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Clear OTP
    await this.otpService.clearOtp(email);

    return { message: 'Password reset successfully' };
  }

  private async generateTokens(user: any) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateApplicationId(): string {
    const timestamp = Date.now().toString().slice(-6);
    return `SEA-${timestamp}`;
  }

  private generateReferralCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}
