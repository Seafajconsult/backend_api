import { Response } from 'express';
import { AuthService } from './auth.service';
import { StudentRegisterDto, EmployerRegisterDto, AdminRegisterDto, LoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, AuthResponseDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerStudent(registerDto: StudentRegisterDto): Promise<{
        message: string;
        applicationId?: string;
    }>;
    registerEmployer(registerDto: EmployerRegisterDto): Promise<{
        message: string;
        applicationId?: string;
    }>;
    registerAdmin(registerDto: AdminRegisterDto): Promise<{
        message: string;
        applicationId?: string;
    }>;
    login(loginDto: LoginDto, response: Response): Promise<AuthResponseDto>;
    verifyEmail(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<{
        message: string;
        data: any;
    }>;
    test(): Promise<{
        message: string;
        timestamp: string;
        endpoints: string[];
    }>;
}
