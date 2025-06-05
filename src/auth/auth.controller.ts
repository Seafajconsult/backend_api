import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common';
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
  MessageResponseDto,
} from './dto';
import { COOKIE } from '../config/constants';

@ApiTags('Authentication')
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register/student')
  @ApiOperation({ summary: 'Register a new student' })
  @ApiResponse({ status: 201, description: 'Student registered successfully', type: MessageResponseDto })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async registerStudent(@Body() registerDto: StudentRegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('register/employer')
  @ApiOperation({ summary: 'Register a new employer' })
  @ApiResponse({ status: 201, description: 'Employer registered successfully', type: MessageResponseDto })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async registerEmployer(@Body() registerDto: EmployerRegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('register/admin')
  @ApiOperation({ summary: 'Register a new admin (Super Admin only)' })
  @ApiResponse({ status: 201, description: 'Admin registered successfully', type: MessageResponseDto })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async registerAdmin(@Body() registerDto: AdminRegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginDto);

    // Set HTTP-only cookie for refresh token
    response.cookie('Authentication', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    response.cookie('Refresh', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return result;
  }

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify email with OTP' })
  @ApiResponse({ status: 200, description: 'Email verified successfully', type: MessageResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  async verifyEmail(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyEmail(verifyOtpDto);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Reset code sent if email exists', type: MessageResponseDto })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with OTP' })
  @ApiResponse({ status: 200, description: 'Password reset successfully', type: MessageResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logout successful', type: MessageResponseDto })
  async logout(@Res({ passthrough: true }) response: Response) {
    // Clear cookies
    response.clearCookie('Authentication');
    response.clearCookie('Refresh');

    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  async getProfile(@Request() req: any) {
    return {
      message: 'Profile retrieved successfully',
      data: req.user,
    };
  }

  @Public()
  @Get('test')
  @ApiOperation({ summary: 'Test endpoint for auth module' })
  @ApiResponse({ status: 200, description: 'Auth module is working' })
  async test() {
    return {
      message: 'Auth module is working correctly',
      timestamp: new Date().toISOString(),
      endpoints: [
        'POST /auth/register/student',
        'POST /auth/register/employer',
        'POST /auth/register/admin',
        'POST /auth/login',
        'POST /auth/verify-email',
        'POST /auth/forgot-password',
        'POST /auth/reset-password',
        'POST /auth/logout',
        'GET /auth/profile',
      ],
    };
  }
}
